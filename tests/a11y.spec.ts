import { readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pagesDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'pages');

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    if (name.startsWith('_')) return [];
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return walk(p);
    return p.endsWith('.astro') ? [p] : [];
  });
}

const routes = walk(pagesDir)
  .filter((f) => !f.includes('['))
  .map((f) => {
    const rel = relative(pagesDir, f).replace(/\\/g, '/').replace('.astro', '');
    if (rel === 'index') return '/';
    if (rel.endsWith('/index')) return '/' + rel.slice(0, -'/index'.length);
    return '/' + rel;
  });

for (const route of routes) {
  test(`${route} has no critical or serious a11y violations`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'load' });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // Fail only on critical and serious issues. Moderate/minor are warnings
    // in the console but don't block — they should be fixed in a sweep.
    const blockers = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious',
    );

    if (blockers.length > 0) {
      const summary = blockers
        .map((v) => `  - ${v.id} (${v.impact}): ${v.help} — ${v.nodes.length} node(s)`)
        .join('\n');
      console.log(`\naxe violations on ${route}:\n${summary}`);
    }

    expect(blockers, `${blockers.length} critical/serious a11y violations on ${route}`).toEqual([]);
  });
}
