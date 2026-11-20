---
name: threejs-development
description: Build or extend React Three Fiber / Drei 3D scenes (product rotation, environments, HDRI lighting). Use when a brief calls for a 3D product reveal or environment.
---

# Three.js / React Three Fiber development

## What actually exists to work with

- `src/3d/RotatingObject.tsx` is the **only** built 3D component so far — a lit, rotating mesh
  with `OrbitControls` and a Drei `Environment` preset. Treat it as the reference pattern, not
  as the finished set of 3D components.
- It's lazy-loaded from `App.tsx` via `React.lazy`/`Suspense` — the Three.js chunk is ~1 MB, so
  **every** 3D scene should be code-split the same way, never imported eagerly at the top of a
  page.
- `automation/asset-search/polyhaven.ts` can search and surface real GLTF models and HDRI
  environments (CC0, no key needed) — use `npm run search-assets -- --kind model` or
  `--kind hdri` rather than hand-picking a placeholder geometry when a brief calls for a real
  product model or environment.

## Building a new scene

1. Follow `RotatingObject.tsx`'s shape: a small inner component doing the actual Three.js work
   (using `useFrame` for animation), wrapped by an exported component that owns the `<Canvas>`.
2. Code-split it with `React.lazy` + `Suspense` from whatever page imports it — don't let a 3D
   scene end up in the main bundle.
3. For a real HDRI instead of a Drei preset string, download one via `asset-research` +
   `video-processing`'s pattern (Poly Haven's `/files/` endpoint already resolves to a real
   `.exr`/`.hdr` URL) and load it with Drei's `Environment files={...}`.
4. Keep interactions (`OrbitControls`, drag-to-rotate, click targets) proportionate to the
   brief — a passive product-reveal scene doesn't need full orbit camera controls if the design
   spec only calls for an auto-rotating hero object.
