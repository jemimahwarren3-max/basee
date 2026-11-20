# Animation guide

How the motion stack fits together, and the one rule every animated component here follows.

## The rule: every animated component has a reduced-motion branch

Each component below checks `window.matchMedia('(prefers-reduced-motion: reduce)').matches` and
either skips its animation setup entirely or falls back to a static equivalent — never a tween
that just runs faster. `tests/reduced-motion.spec.ts` checks this holds for the page as a whole;
when adding a new animated component, check it the same way the existing ones do before calling
it done (see the `motion-design` skill).

## Smooth scroll: Lenis

`src/animations/useLenis.ts` — call once near the app root (`App.tsx` already does). Uses
Lenis's own `autoRaf` to drive itself; no-ops entirely under reduced motion (no smooth-scroll
override at all, so native scroll behavior takes over).

## GSAP + ScrollTrigger

Four components, each a thin wrapper around one `gsap.fromTo`/`gsap.to` call with a
`scrollTrigger` config, all registering `ScrollTrigger` once at module scope:

- `src/animations/ScrollReveal.tsx` — fade + slide in once, on scroll into view
  (`toggleActions: 'play none none reverse'`).
- `src/effects/Parallax.tsx` — continuous scrub (`scrub: true`) tied to scroll position, not a
  one-shot reveal.
- `src/effects/HorizontalScroll.tsx` — pins the section and scrubs a horizontal translate; under
  reduced motion the panels stay in normal (non-pinned) horizontal flex flow instead.
- `src/effects/TextReveal.tsx` — splits text into words, staggers their reveal.

**Cleanup matters**: every one of these returns a cleanup function from its `useEffect` that
kills both the tween and its `ScrollTrigger` (`tween.scrollTrigger?.kill(); tween.kill()`).
Skipping this leaks a ScrollTrigger instance (and its scroll listener) every time the component
unmounts — copy this pattern exactly in any new one.

## WebP scroll sequence (not GSAP)

`src/video/ScrollSequence.tsx` doesn't use GSAP at all — it's a raw scroll listener drawing to a
`<canvas>`, because GSAP tweens interpolate numeric values, not "which of these 240 images is
currently the right one." See [docs/TEMPLATES.md](TEMPLATES.md) and
[docs/MEDIA_PROCESSING.md](MEDIA_PROCESSING.md) for the FFmpeg side that produces its frames.

## Framer Motion

Installed (`framer-motion` in `package.json`) but **has no demo component yet** in this repo —
GSAP covers everything the current demo needs. If a brief specifically wants Framer Motion's
declarative `variants`/`AnimatePresence` API (e.g. for page transitions or exit animations GSAP
handles more awkwardly), build it fresh in `src/animations/` following the same
reduced-motion-guard + cleanup pattern as the GSAP components above. Don't claim a Framer Motion
component exists until one does.

## Three.js (separate concern)

3D rotation/animation (`src/3d/RotatingObject.tsx`) uses React Three Fiber's `useFrame`, not
GSAP or Lenis — see [docs/ARCHITECTURE.md](ARCHITECTURE.md) and the `threejs-development` skill.

## Picking what to use, per template

`templates/<name>/theme.ts`'s `motion.intensity` and `avoid` list say which of the above fits a
given art direction — e.g. `luxury` explicitly avoids `HorizontalScroll`, `ecommerce` avoids
both `HorizontalScroll` and `ScrollSequence`. Check the chosen template before reaching for an
effect, not after.
