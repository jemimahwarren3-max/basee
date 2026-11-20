---
name: motion-design
description: Wire up GSAP/ScrollTrigger/Lenis/Framer Motion effects — parallax, horizontal scroll, text reveals, scroll reveals — using the components already built in src/animations/ and src/effects/. Use once real assets and a design spec exist.
---

# Motion design

Apply motion with the components that already exist — don't reinvent a GSAP ScrollTrigger setup
inline when a reusable one is sitting in `src/effects/`.

## What actually exists to work with

- `src/animations/useLenis.ts` — smooth-scroll hook, call once near the app root. Self-driving
  `autoRaf`, no-ops under `prefers-reduced-motion`.
- `src/animations/ScrollReveal.tsx` — fade/slide-in wrapper on scroll-into-view.
- `src/effects/Parallax.tsx` — scrubbed vertical drift (`distance` prop).
- `src/effects/HorizontalScroll.tsx` — pinned horizontal panel scroll. Falls back to normal
  (non-pinned) horizontal flex flow under reduced motion, so content is never lost.
- `src/effects/TextReveal.tsx` — per-word stagger reveal; renders plain text under reduced
  motion.
- `src/effects/BeforeAfterSlider.tsx` — pointer + keyboard comparison slider, no animation
  library needed.
- `src/video/ScrollSequence.tsx` — canvas-based scroll-scrubbed WebP sequence (pairs with
  `video-processing`'s `extract-frames`).
- `templates/<name>/theme.ts`'s `motion.intensity` (`minimal`/`moderate`/`maximal`) and `avoid`
  list say which of the above actually fits the chosen direction — e.g. the `luxury` and
  `ecommerce` themes explicitly avoid `HorizontalScroll`.

Framer Motion is installed but has no demo component yet in this repo — if a brief specifically
calls for Framer Motion's declarative variants API, build it as a new file in `src/animations/`
following the same `prefers-reduced-motion` + cleanup pattern as the files above, don't assume
one already exists.

## Process

1. Check the chosen template's `motion.intensity` and `avoid` list before reaching for an effect.
2. Reuse the existing component; only write a new one in `src/effects/` or `src/animations/` if
   nothing covers the need, and match the existing pattern (reduced-motion guard, cleanup
   function returned from `useEffect`, kill the ScrollTrigger on unmount).
3. Verify in a running dev server — GSAP/ScrollTrigger bugs don't show up in `tsc`, only at
   runtime.
