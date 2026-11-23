import { readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect } from '@playwright/test';

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
  // dynamic routes like [slug].astro can't be tested without params, so skip
  .filter((f) => !f.includes('['))
  .map((f) => {
    const rel = relative(pagesDir, f).replace(/\\/g, '/').replace('.astro', '');
    if (rel === 'index') return '/';
    if (rel.endsWith('/index')) return '/' + rel.slice(0, -'/index'.length);
    return '/' + rel;
  });

for (const route of routes) {
  test(`${route} loads without JavaScript errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
    });

    const response = await page.goto(route, { waitUntil: 'load' });
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1').first()).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test.describe('launch readiness', () => {
  test.skip(
    !process.env.LAUNCH_CHECK,
    'Set LAUNCH_CHECK=1 to fail on remaining [placeholder] text',
  );

  for (const route of routes) {
    test(`${route} has no bracketed placeholder text`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'load' });
      const text = await page.locator('body').innerText();
      const leftovers = [...text.matchAll(/\[[A-Za-z][^\]\n]{0,60}\]/g)].map((m) => m[0]);
      expect(leftovers, `placeholders still on ${route}`).toEqual([]);
    });
  }
});
