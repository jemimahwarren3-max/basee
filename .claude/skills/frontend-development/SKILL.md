---
name: frontend-development
description: Compose the actual pages/sections/layouts for a client site out of the existing components, Tailwind, and the chosen template's design tokens. Use once design spec, assets, and motion/3D pieces are in place.
---

# Frontend development

Build the real pages — `src/components/`, `src/layouts/`, and `src/sections/` are currently
**empty** (reserved scaffolding, see [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)); this
skill is what actually fills them in per project.

## What actually exists to work with

- React 19 + TypeScript + Vite + Tailwind CSS v4. `src/App.tsx` is currently a demo of every
  Phase 1-6 component — replace its content with the real site, don't leave the demo in place.
- Reusable pieces: `src/animations/`, `src/effects/`, `src/3d/`, `src/video/` (see
  `motion-design` and `threejs-development` skills for what's in each).
- `templates/<name>/theme.ts` gives concrete colors/fonts/motion intensity for the chosen
  direction — wire these into Tailwind (CSS variables in `src/index.css`, or inline styles where
  Tailwind's default palette doesn't cover a brand color) rather than inventing new ones ad hoc.
- `docs/DESIGN_BRIEF.md` (written by `creative-direction`, or seeded by `create-project`) is the
  spec to build against.

## Process

1. Read the design brief and the template's `suggestedComponents`/`avoid` lists before writing
   a section.
2. Build sections as components in `src/sections/`, shared chrome (nav, footer) in
   `src/layouts/`, and small reusable pieces in `src/components/`.
3. Keep accessibility and performance non-negotiable even under deadline pressure: semantic
   HTML, keyboard operability (the existing `BeforeAfterSlider` is a working example), lazy-load
   anything heavy (3D, large images) the way `RotatingObject` already demonstrates, and route
   every animation through the reduced-motion pattern the existing components use.
4. Run `npm run build` and fix every type error before calling a page done — don't leave a red
   build and move on.
