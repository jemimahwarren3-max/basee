# Architecture status

This repo is built in phases. This file tracks what is real versus reserved, so nothing in the
folder tree is mistaken for a working feature before it exists.

`media-library/*` isn't listed under Reserved below — it's active storage, populated at runtime
by the Phase 4/5 scripts (`manifest.json`, downloaded assets, extracted frame sequences). Its
contents are gitignored; only `.gitkeep` is tracked.

## Built (Phase 1-3): foundation, animation, 3D

- `src/` — React 19 + TypeScript app, Vite dev/build, Tailwind CSS v4 via `@tailwindcss/vite`.
- `package.json`, `vite.config.ts`, `tsconfig*.json` — working toolchain.
- `src/animations/useLenis.ts` — Lenis smooth-scroll hook (self-driving `autoRaf`, skips under
  `prefers-reduced-motion`).
- `src/animations/ScrollReveal.tsx` — GSAP + ScrollTrigger fade/slide-in wrapper, skips under
  `prefers-reduced-motion`, cleans up its ScrollTrigger on unmount.
- `src/3d/RotatingObject.tsx` — React Three Fiber + Drei scene (lit, rotating mesh, OrbitControls,
  HDRI environment). Lazy-loaded from `App.tsx` via `React.lazy`/`Suspense` so the ~1 MB
  Three.js chunk is deferred, not in the main bundle.
- `src/App.tsx` — wires all three together as a live, verified demo (not just unused files):
  hero → 3D scene → scroll-triggered reveal section.
- Directory skeleton below, created now so later phases land in the right place.
- Verified: `tsc -b` clean, `npm run build` succeeds (code-split, main chunk 356 kB / 3D chunk
  989 kB lazy), dev server serves and transforms all of the above without errors.
- Framer Motion and `three`/`@react-three/drei`/`@react-three/fiber` are installed; Framer
  Motion has no demo component yet (GSAP covers the current scroll-reveal case) — don't claim UI
  transitions are built until one exists in `src/animations/`.

## Built (Phase 4): asset research

- `automation/asset-search/` — Pexels, Pixabay, Unsplash, Poly Haven, and Sketchfab search
  clients, normalized to one `AssetSearchResult` shape with license info attached. See
  [docs/ASSET_RESEARCH.md](ASSET_RESEARCH.md) for exactly what's live-verified (Poly Haven,
  Sketchfab) versus implemented-but-untested against a real key (Pexels, Pixabay, Unsplash — no
  key in this environment).
- `automation/asset-search/manualSources.ts` — sources with no download API (Mixkit, Coverr,
  Videvo, Rawpixel, LottieFiles, and the pngkey/pngegg/kindpng/pngwing/pngitem aggregators,
  flagged `licenseTrust: 'unclear'`), surfaced as links only.
- `automation/asset-download/` — `downloadAsset()` (refuses non-commercial-licensed assets
  unless explicitly overridden by a human) and a Zod-validated per-project manifest
  (`media-library/<project>/manifest.json`).
- `scripts/search-assets.ts`, `scripts/download-asset.ts` — the actual CLI entry points
  (`npm run search-assets`, `npm run download-asset`). Live-tested against Poly Haven.
- `automation/env.ts` — loads `.env.local` for these Node-side scripts only; never imported by
  `src/`.

## Built (Phase 5): media processing

- `automation/video-processing/` — `probeVideo()` (ffprobe metadata), `transcodeVideo()` /
  `trimVideo()` (resize, fps conversion, MP4/H.264 or WebM/VP9, mute), `generatePoster()`
  (still-frame extraction), `extractFrameSequence()` (WebP frame sequence for scroll-controlled
  video, matching the master spec's exact ffmpeg recipe). FFmpeg/ffprobe are bundled via
  `ffmpeg-static`/`ffprobe-static` — no system install required, per your earlier choice.
- `automation/image-processing/` — Sharp-based `optimizeImage()`, `generateResponsiveSet()`,
  `inspectImage()`. Output format is chosen by the output file's extension.
- `scripts/process-video.ts`, `scripts/extract-frames.ts`, `scripts/optimise-images.ts` — the
  CLI entry points (`npm run process-video`, `npm run extract-frames`,
  `npm run optimise-images`).
- `automation/cli.ts` — shared argv parser used by every script in `scripts/`.
- **Verified end-to-end**, not just type-checked: every command above was run against a
  synthetic `ffmpeg testsrc` clip and the outputs were re-probed to confirm duration,
  resolution, fps, codec, and mute state actually changed as requested. See
  [docs/MEDIA_PROCESSING.md](MEDIA_PROCESSING.md).

## Reserved (later phases, currently empty — `.gitkeep` only)

| Path | Will hold | Phase |
| --- | --- | --- |
| `src/video/` | Scroll-controlled video/canvas sequence components | 6 |
| `src/effects/` | Shaders, particles, masking, morphing effects | 6 |
| `src/components/`, `src/layouts/`, `src/sections/` | Reusable UI building blocks | 2-6 |
| `automation/project-generation/` | `npm run create-project` scaffolding logic | 7 |
| `templates/*` | Starting points per art direction (cinematic, luxury, editorial, ecommerce, creative, immersive) | 6 |
| `.claude/skills/*` | Creative-direction, asset-research, video-processing, motion-design, threejs-development, frontend-development, quality-assurance skills | 7 |
| `.claude/commands/` | Slash commands (e.g. project init) | 7 |
| `tests/` | Playwright test suites | 8 |

Nothing under "Reserved" should be treated as implemented until this table is updated.
