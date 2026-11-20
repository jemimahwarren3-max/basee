# Deployment guide

## The shipped site is 100% static — there is no backend

`npm run build` produces `dist/` — plain HTML/CSS/JS, nothing server-side. The
`automation/`/`scripts/` tooling (asset research, FFmpeg/Sharp processing, project generation,
test running) is **development-time only**. None of it, and none of your `.env.local` API keys,
is part of the build or reaches a deployed site — `vite build` only ever bundles `src/`.

That means deployment is as simple as "upload `dist/` to any static host." There's no server to
provision, no environment variables to configure in production, and no API routes to secure.

## Before deploying

1. `npm run test:report` — the one command that runs everything real (type-check, build, lint,
   Playwright) and writes `test-results/REPORT.md`. Don't deploy on a red report.
2. Check `dist/`'s chunk sizes in the build output. `RotatingObject.tsx`'s Three.js chunk is
   already lazy-loaded (not in the main bundle) — if a new 3D/heavy dependency lands in the main
   chunk instead of behind a `React.lazy()` boundary, fix that before shipping, not after.
3. Confirm every asset in `media-library/<project>/` that the shipped pages actually reference
   has `commercialUsePermitted: true` in `media-library/<project>/manifest.json` — `
   downloadAsset()` already refuses non-commercial licenses by default, but double-check if
   anyone ever passed `--force-non-commercial true`.

## Hosting options

Any static host works — Vercel, Netlify, Cloudflare Pages, GitHub Pages, or a plain S3/CDN
bucket. None of them need a build-time environment variable for this project, since no key
reaches the client bundle. Point the host's build command at `npm run build` and its output
directory at `dist/`.

This repo doesn't pick one for you or ship a platform-specific config file (`vercel.json`,
`netlify.toml`, etc.) — add one only if the actual client project needs host-specific behavior
(redirects, headers), not as a default.

## What not to deploy

- `media-library/` — these are source assets and the manifest, not the optimized files actually
  referenced by the built site (which should live under `public/` or be imported into `src/` so
  Vite fingerprints and bundles them). If a component is still pointing at a raw
  `media-library/...` path instead of a processed, bundled asset, fix that before shipping.
- `.env.local`, `docs/`, `automation/`, `scripts/`, `tests/` — none of this is referenced by
  `dist/`; there's no need to exclude it explicitly (it simply isn't part of the Vite build),
  but don't go out of your way to copy it alongside `dist/` either.
