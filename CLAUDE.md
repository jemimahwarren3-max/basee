# Yonah Creative Engine

A reusable, AI-assisted website production engine for Yonah Studio. Clone it per client, open it
in Claude Code, and describe the website — the engine researches assets, builds the site, tests
it, and reports what it actually did.

## Current status

Phase 1-2 only: the React + TypeScript + Vite + Tailwind foundation. See
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for exactly what's built versus reserved for later
phases (asset research, FFmpeg pipeline, 3D/animation libraries, templates, Claude skills,
Playwright tests). Don't claim a later-phase feature works — check that file first.

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

React 19, TypeScript, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), Lucide React icons, Zod for
validation. Everything else in the master spec (GSAP, Three.js/R3F, FFmpeg, Playwright, the
`.claude/skills/*` set, templates) is scoped for later phases — add dependencies only when a
phase actually needs them, and keep each client project loading only what it uses.

## Commands

```
npm run dev       # start the Vite dev server
npm run build     # type-check + production build
npm run preview   # preview the production build
npm run lint      # oxlint
```
