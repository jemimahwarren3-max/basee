# Architecture status

This repo is built in phases. This file tracks what is real versus reserved, so nothing in the
folder tree is mistaken for a working feature before it exists.

## Built (Phase 1-2)

- `src/` — React 19 + TypeScript app, Vite dev/build, Tailwind CSS v4 via `@tailwindcss/vite`.
- `package.json`, `vite.config.ts`, `tsconfig*.json` — working toolchain.
- Directory skeleton below, created now so later phases land in the right place.

## Reserved (later phases, currently empty — `.gitkeep` only)

| Path | Will hold | Phase |
| --- | --- | --- |
| `src/animations/` | GSAP, ScrollTrigger, Framer Motion helpers and components | 3 |
| `src/3d/` | Three.js / React Three Fiber / Drei scenes | 3 |
| `src/video/` | Scroll-controlled video/canvas sequence components | 3 |
| `src/effects/` | Shaders, particles, masking, morphing effects | 3 |
| `src/components/`, `src/layouts/`, `src/sections/` | Reusable UI building blocks | 2-6 |
| `automation/asset-search/` | Pexels/Pixabay/Unsplash/Poly Haven/Sketchfab search clients | 4 |
| `automation/asset-download/` | Permitted-download logic + licence capture | 4 |
| `automation/video-processing/`, `automation/image-processing/` | FFmpeg/Sharp pipelines | 5 |
| `automation/project-generation/` | `npm run create-project` scaffolding logic | 7 |
| `scripts/` | CLI entry points that call into `automation/` | 4-5 |
| `templates/*` | Starting points per art direction (cinematic, luxury, editorial, ecommerce, creative, immersive) | 6 |
| `media-library/*` | Per-project downloaded/processed assets (gitignored contents) | 4-5 |
| `.claude/skills/*` | Creative-direction, asset-research, video-processing, motion-design, threejs-development, frontend-development, quality-assurance skills | 7 |
| `.claude/commands/` | Slash commands (e.g. project init) | 7 |
| `tests/` | Playwright test suites | 8 |

Nothing under "Reserved" should be treated as implemented until this table is updated.
