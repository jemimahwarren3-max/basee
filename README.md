# Yonah Creative Engine

A reusable, AI-assisted creative website production engine for Yonah Studio. Clone this
repository per client, open it in Claude Code, describe the brief, and the engine researches
visual assets, builds the site, tests it, and reports what actually happened.

**Status:** early foundation (Phase 1-2 of the full spec). See
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for what's implemented versus reserved.

## Install

```
npm install
```

## Develop

```
npm run dev
```

## Build

```
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in your own API keys (Pexels, Pixabay, Unsplash).
`.env.local` is gitignored — never commit real keys. The asset-research integrations that read
these keys are not built yet (see `docs/ARCHITECTURE.md`).

## License

Private — Yonah Studio internal use.
