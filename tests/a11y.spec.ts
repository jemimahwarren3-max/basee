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

const themes = ['light', 'dark'] as const;

for (const route of routes) {
  for (const theme of themes) {
    test(`${route} has no critical or serious a11y violations (${theme})`, async ({ page }) => {
      // Seed the theme in localStorage before the page loads so the inline
      // init script in Site.astro picks it up and sets [data-theme] pre-paint.
      await page.addInitScript((t) => {
        try { localStorage.setItem('theme', t); } catch {}
      }, theme);

      await page.goto(route, { waitUntil: 'load' });

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const blockers = results.violations.filter(
        (v) => v.impact === 'critical' || v.impact === 'serious',
      );

      if (blockers.length > 0) {
        const summary = blockers
          .map((v) => `  - ${v.id} (${v.impact}): ${v.help} — ${v.nodes.length} node(s)`)
          .join('\n');
        console.log(`\naxe violations on ${route} (${theme}):\n${summary}`);
      }

      expect(blockers, `${blockers.length} critical/serious a11y violations on ${route} (${theme})`).toEqual([]);
    });
  }
}
