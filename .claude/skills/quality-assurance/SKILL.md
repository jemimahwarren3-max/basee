---
name: quality-assurance
description: Run the real checks — type-check, production build, lint, and the Playwright suite (functional, responsive, reduced-motion) — and generate a readable report before calling anything done.
---

# Quality assurance

## What actually exists to run

- `npm run test:report` — the one command that matches the spec's "generate a readable test
  report, never report success without actually running the tests." Runs `tsc -b`, the
  production build, `oxlint`, and the full Playwright suite for real via `child_process`, and
  writes `test-results/REPORT.md` with PASS/FAIL per check (and the actual failing output
  inlined on failure). See [docs/TESTING.md](../../docs/TESTING.md).
- `npm run test` — just the Playwright suite, if you don't need the full report.
- Playwright runs against **two projects** (Desktop Chrome, Mobile Chrome/Pixel 5) — every spec
  in `tests/` is automatically also a responsiveness check.
- What's covered today: page loads with no console errors, no broken images, no horizontal
  overflow (both viewports), `prefers-reduced-motion` content visibility, the `ScrollSequence`
  actually stepping through multiple frames on scroll, and the `BeforeAfterSlider` responding to
  keyboard input. **Nothing checks navigation, forms, or buttons** — the current demo page has
  none; a real client project needs its own specs added for whatever it actually has.

## Process

1. After any change, run `npm run test:report`, not just whichever individual command seems
   relevant — a change to one area can break another (e.g. a new dependency bloating the bundle
   a build-size check would have caught).
2. When building a new page for a client project, add specs to `tests/` for its actual
   navigation/forms/buttons — don't leave a real interactive element untested just because the
   demo page didn't have one to copy from.
3. For anything touching animation, 3D, or scroll behavior specifically, also follow the
   `motion-design`/`threejs-development` skills' guidance on checking the reduced-motion branch
   exists before writing a test for it.
4. Never report a check as passing without having actually run it this session — paste the real
   PASS/FAIL table, not a prediction of what it would say.
