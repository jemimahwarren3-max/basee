# Testing (Phase 8)

Playwright, configured in `playwright.config.ts`, runs against two projects — Desktop Chrome and
Mobile Chrome (Pixel 5 viewport) — so every spec in `tests/` doubles as a responsiveness check.
`webServer` starts `npm run dev` automatically; you don't need the dev server already running.

```
npm run test           # playwright test — just the suite
npm run test:report    # tsc -b + build + lint + playwright, writes test-results/REPORT.md
```

`test:report` is the one that matches the master spec's "generate a readable test report, never
report success without actually running the tests" — it's a thin wrapper
(`scripts/run-tests.ts`) around the same commands, each run for real via `child_process`, with
PASS/FAIL per check and the failing command's actual output inlined on failure.

## What each spec file actually checks

- `tests/smoke.spec.ts` — page loads (200 response, correct `<title>`), zero console/page
  errors, every `<img>` on the page actually loaded (`naturalWidth > 0`).
- `tests/responsive.spec.ts` — no horizontal overflow, at both the desktop and mobile viewport
  (same file, two projects).
- `tests/reduced-motion.spec.ts` — emulates `prefers-reduced-motion: reduce` and checks that
  content animated components would otherwise reveal is already visible, not stuck at
  `opacity: 0` waiting for a GSAP tween that was correctly skipped.
- `tests/scroll-sequence.spec.ts` — scrolls the page in steps and asserts more than one distinct
  `ScrollSequence` frame URL was requested, i.e. the frame-stepping logic actually ran under a
  real scroll, not just that the component mounted.
- `tests/before-after-slider.spec.ts` — keyboard-operates the slider (`ArrowRight`/`ArrowLeft`)
  and checks `aria-valuenow` actually moves.

All 12 (6 specs × 2 projects) pass against the current demo `App.tsx`.

## What this doesn't cover yet

- No navigation/forms/buttons tests — the current demo page has none. Each real client project
  built from this engine needs its own specs added here for whatever it actually has.
- No visual regression testing (pixel-diffing) — intentionally not added; it's typically more
  flaky-prone than useful without a long-term baseline image strategy, and nothing in the spec
  asked for it specifically.
