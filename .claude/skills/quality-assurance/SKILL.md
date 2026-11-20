---
name: quality-assurance
description: Run the real checks that exist today (type-check, production build, lint) before calling anything done. Playwright (Phase 8) is not built yet — don't claim browser tests ran.
---

# Quality assurance

**Honesty first**: this repo does not have a Playwright suite yet — `tests/` is empty, reserved
for Phase 8 (see [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)). Never report that
automated browser tests passed; they don't exist. What's real today:

## What actually exists to run

- `npx tsc -b --force` (or `npm run build`, which includes it) — type-checks `src/`,
  `automation/`, `scripts/`, and `templates/`. Must be clean.
- `npm run build` — production build via Vite. Check the output for new oversized chunks (the
  3D scene chunk is already large and already lazy-loaded; don't let a new heavy dependency land
  in the main bundle uncaught).
- `npm run lint` — oxlint across the whole project.
- No automated way yet to check a page actually renders without errors in a browser. Until
  Phase 8 lands, that means: run `npm run dev`, and fetch the rendered page and the transformed
  module sources with curl/WebFetch to confirm they return 200 and contain no obvious error
  markers — this catches module-resolution and transform errors, but **does not** substitute
  for actually looking at the page. Say so explicitly when reporting results instead of implying
  full browser verification happened.

## Process

1. Run `tsc -b`, `npm run build`, `npm run lint` after any change — all three, not just
   whichever one seems relevant.
2. For anything touching animation, 3D, or scroll behavior, start the dev server and hit the
   relevant routes/modules to confirm they transform and serve without error, per above.
3. Check responsiveness and `prefers-reduced-motion` behavior by reading the component (every
   component this engine has built so far has an explicit reduced-motion branch) — flag any new
   animation component that's missing one.
4. When Phase 8 actually adds Playwright, replace this skill's "no browser automation yet"
   section — don't let it go stale once that's no longer true.
