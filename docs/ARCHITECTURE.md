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

## Built (Phase 6): reusable components + templates

- `src/video/ScrollSequence.tsx` + `src/video/scrollSequenceMath.ts` — canvas-based
  scroll-scrubbed WebP sequence player. The frame-index/preload-window math is pure functions,
  verified with real assertions (not just type-checked).
- `src/effects/Parallax.tsx`, `HorizontalScroll.tsx`, `TextReveal.tsx`, `BeforeAfterSlider.tsx`
  — each respects `prefers-reduced-motion` (or, for the slider, needs no motion at all).
- `templates/` — six design-token "starting points" (`cinematic`, `luxury`, `editorial`,
  `ecommerce`, `creative`, `immersive`), each with genuinely different colors/fonts/motion
  intensity/suggested-and-avoided components — not the same site in six colors. Read via
  `getTemplate(name)` from `templates/index.ts`. See [docs/TEMPLATES.md](TEMPLATES.md).
- `src/App.tsx` demonstrates every Phase 6 component live; verified with `tsc -b`, a production
  build, and a running dev server (every new module and the demo WebP sequence served 200).
- `public/demo-sequence/` — a 20-frame, ~88 KB synthetic WebP sequence this repo generated
  itself via `npm run extract-frames` (not stock footage) purely so `ScrollSequence` has
  something real to scrub. Swap it out per client project.
- `src/components/`, `src/layouts/`, `src/sections/` remain empty — this phase built the
  lower-level reusable primitives (effects/3d/video), not page-level composition components.

## Built (Phase 7): Claude skills + project generation

- `.claude/skills/{creative-direction,asset-research,video-processing,motion-design,
  threejs-development,frontend-development,quality-assurance}/SKILL.md` — all seven, each
  grounded in the files/scripts that actually exist (named explicitly), not aspirational. The
  `quality-assurance` skill states plainly that Playwright (Phase 8) isn't built yet.
- `.claude/commands/create-project.md` — the `/create-project` slash command.
- `automation/project-generation/createProject.ts` + `automation/project-generation/slug.ts` —
  clones the engine's current foundation into a new, isolated directory: excludes
  `node_modules`/`.git`/`dist`/`.env.local`, scrubs any `media-library/*` contents down to
  `.gitkeep` (never a previous client's assets or manifest), writes `project.config.json`,
  seeds `docs/DESIGN_BRIEF.md` from the chosen template's tokens, appends a `## Project: ...`
  section to the copied `CLAUDE.md`, and runs `git init` **inside the new directory**.
- `automation/exec.ts` — the generic command runner (promoted out of
  `automation/video-processing/run.ts`, which Phase 5's modules now import from here instead —
  no behavior change, just removed duplication now that project-generation needed `git` too).
- `scripts/create-project.ts` — the CLI entry point (`npm run create-project`).
- **Verified end-to-end**, not just type-checked: ran `create-project` against a live template,
  confirmed `node_modules`/`.env.local` were excluded, `media-library/*` was empty, the design
  brief and `CLAUDE.md` section were correctly filled from the template's real tokens, and `git
  init` created `.git` in the *new* directory, not the engine repo. Also caught and fixed a real
  bug in this pass: the first version ran `git init` in the engine repo's own `cwd` instead of
  the new project directory (harmless — `git init` on an existing repo is a no-op — but wrong).
  Also verified the two refusal paths: an unknown template name throws, and a non-empty
  `outputDir` is refused rather than overwritten.

## Reserved (later phases, currently empty — `.gitkeep` only)

| Path | Will hold | Phase |
| --- | --- | --- |
| `src/components/`, `src/layouts/`, `src/sections/` | Page-level composition components, per client project | 7+ |
| `tests/` | Playwright test suites | 8 |

Nothing under "Reserved" should be treated as implemented until this table is updated.
