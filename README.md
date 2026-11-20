# Yonah Creative Engine

A reusable, AI-assisted creative website production engine for Yonah Studio. Clone this
repository per client, open it in Claude Code, describe the brief, and the engine researches
real visual assets, processes them, builds the site, tests it, and reports what actually
happened — never what it assumes happened.

```
Describe it → Source it → Build it
```

**Status:** all 10 phases of the master spec are built, verified, and published. See
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for exactly what each phase delivered and how it
was verified.

## Quickstart

```bash
git clone <repo-url> yonah-creative-engine
cd yonah-creative-engine
npm install
cp .env.example .env.local   # optional — Poly Haven/Sketchfab asset search needs no key
npm run dev
```

Windows users: see [docs/WINDOWS_SETUP.md](docs/WINDOWS_SETUP.md) for a PowerShell-specific
walkthrough and a real Windows-only bug this repo already hit and fixed.

## Starting a new client project

```bash
npm run create-project -- --name "Aurum Perfume Co." --template luxury
```

Templates: `cinematic`, `luxury`, `editorial`, `ecommerce`, `creative`, `immersive` — see
[docs/TEMPLATES.md](docs/TEMPLATES.md). This clones the current foundation into a new, isolated
directory, seeds a design brief from the chosen template, and never carries over a previous
client's downloaded assets, manifest, or `.env.local`.

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
npm run test                # run the Playwright suite
npm run test:report         # tsc -b + build + lint + Playwright, writes test-results/REPORT.md
```

## Documentation

- [CLAUDE.md](CLAUDE.md) — how the seven Claude skills fit together, the ground rules, the full
  stack.
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — what's built vs. reserved, phase by phase. The
  source of truth; if another doc disagrees with this one, trust this one.
- [docs/WINDOWS_SETUP.md](docs/WINDOWS_SETUP.md) — Windows-specific setup and gotchas.
- [docs/ENVIRONMENT.md](docs/ENVIRONMENT.md) — every env var, where to get each key, what
  actually reads them (and what never does).
- [docs/ASSET_RESEARCH.md](docs/ASSET_RESEARCH.md), [docs/ASSET_SOURCES.md](docs/ASSET_SOURCES.md)
  — the asset search/download pipeline and a trust assessment of every source.
- [docs/MEDIA_PROCESSING.md](docs/MEDIA_PROCESSING.md) — the FFmpeg/Sharp pipeline.
- [docs/ANIMATION.md](docs/ANIMATION.md) — the motion stack and the reduced-motion rule every
  component follows.
- [docs/TEMPLATES.md](docs/TEMPLATES.md) — the six art-direction starting points.
- [docs/TESTING.md](docs/TESTING.md) — the Playwright suite, what it checks and what it doesn't.
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — why the shipped site is 100% static and how to host
  it anywhere.
- [CONTRIBUTING.md](CONTRIBUTING.md) — how to extend the engine itself (new component, template,
  or skill) without drifting from what's documented as actually built.

## License

Private — Yonah Studio internal use.
