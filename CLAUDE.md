# Yonah Creative Engine

A reusable, AI-assisted website production engine for Yonah Studio. Clone it per client, open it
in Claude Code, and describe the website — the engine researches assets, builds the site, tests
it, and reports what it actually did.

## Current status

Phase 1-7 of 10. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for exactly what's built
versus reserved (Playwright tests are Phase 8 — not built yet). Don't claim a later-phase
feature works — check that file first.

## How the skills fit together

Seven skills in `.claude/skills/` cover the production pipeline end to end, roughly in this
order for a new client brief:

1. **creative-direction** — brief → design spec, picks/adapts one of `templates/`'s six
   directions, writes `docs/DESIGN_BRIEF.md`.
2. **asset-research** — design spec → real, specific footage/images/3D assets via
   `npm run search-assets` / `download-asset`, licensed and manifested.
3. **video-processing** — raw downloaded assets → processed deliverables via
   `npm run process-video` / `extract-frames` / `optimise-images`.
4. **motion-design** and **threejs-development** — wire up the animation/3D components
   (`src/animations/`, `src/effects/`, `src/video/`, `src/3d/`) against the processed assets.
5. **frontend-development** — compose the actual pages in `src/components/`, `src/layouts/`,
   `src/sections/` out of all of the above.
6. **quality-assurance** — type-check, build, lint before calling anything done; honest about
   what's actually automatable until Phase 8 adds Playwright.

Each skill's `SKILL.md` names the exact files/scripts it uses — if a skill describes something
that no longer matches `docs/ARCHITECTURE.md`, trust the architecture doc and fix the skill.

`npm run create-project -- --name "..." --template <name>` (or `/create-project` in
`.claude/commands/`) scaffolds a new, isolated client project from the current foundation —
never the previous client's downloaded assets, manifest, or `.env.local`.

## Ground rules for this repo

- **Never fabricate.** Don't claim an asset was downloaded, a test passed, or a build succeeded
  without actually running it.
- **Ask before anything irreversible or costly.** Paid API calls, purchasing assets, publishing
  the repo, or touching a private account all need explicit approval first.
- **No placeholder modules presented as working.** An empty folder is fine (it's in
  `docs/ARCHITECTURE.md` as reserved); a file that pretends to implement a feature it doesn't is
  not.
- **Each client project gets its own art direction.** Don't default to a generic AI-website look,
  and don't carry one client's confidential assets or content into another client's project.
- **Secrets live in `.env.local`**, never in source or commits. `.env.example` documents what's
  needed.

## Stack (as installed so far)

React 19, TypeScript, Vite, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis, Framer Motion (no demo
component yet), Three.js + React Three Fiber + Drei, FFmpeg/ffprobe (bundled via
`ffmpeg-static`/`ffprobe-static`), Sharp, Zod, Lucide React. Playwright (Phase 8) is not
installed yet. Keep each client project loading only what it actually uses — see each
template's `suggestedLibraries`/`avoid` in `templates/`.

## Commands

```
npm run dev              # start the Vite dev server
npm run build             # type-check + production build
npm run preview           # preview the production build
npm run lint               # oxlint
npm run search-assets      # research assets (Pexels/Pixabay/Unsplash/Poly Haven/Sketchfab)
npm run download-asset     # download one chosen asset + record it in the manifest
npm run process-video      # probe / trim / transcode / poster
npm run extract-frames     # WebP frame sequence for ScrollSequence
npm run optimise-images    # resize/convert images, or generate a responsive set
npm run create-project     # scaffold a new, isolated client project
```
