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
  .filter((f) => !f.includes('['))
  .map((f) => {
    const rel = relative(pagesDir, f).replace(/\\/g, '/').replace('.astro', '');
    if (rel === 'index') return '/';
    if (rel.endsWith('/index')) return '/' + rel.slice(0, -'/index'.length);
    return '/' + rel;
  });

// Catastrophe-only budgets. A real perf budget needs Lighthouse against a
// production deploy with throttled network; localhost + cold-cache numbers
// drift too much for tight thresholds. See CLAUDE.md for the Lighthouse recipe.
const MAX_DCL_MS = 5000;
const MAX_PAGE_WEIGHT_KB = 2000;

for (const route of routes) {
  test(`${route} meets performance budget`, async ({ page }) => {
    let bytes = 0;
    page.on('response', async (res) => {
      try {
        const body = await res.body();
        bytes += body.length;
      } catch {
        // Some requests (data URLs, redirects) don't have a body
      }
    });

    await page.goto(route, { waitUntil: 'load' });

    const timing = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        dcl: nav.domContentLoadedEventEnd - nav.startTime,
        load: nav.loadEventEnd - nav.startTime,
      };
    });

    const weightKb = Math.round(bytes / 1024);
    const dcl = Math.round(timing.dcl);
    console.log(`${route}: DCL ${dcl}ms · ${weightKb}KB`);

    expect(dcl, `${route} DOMContentLoaded over budget`).toBeLessThan(MAX_DCL_MS);
    expect(weightKb, `${route} page weight over budget`).toBeLessThan(MAX_PAGE_WEIGHT_KB);
  });
}
