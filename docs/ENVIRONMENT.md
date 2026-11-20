# Environment variables

Copy `.env.example` to `.env.local` before running anything that needs an API key. `.env.local`
is gitignored (covered by the `*.local` pattern) — never commit real keys, and `create-project`
never copies `.env.local` into a new client project either.

```
PEXELS_API_KEY=
PIXABAY_API_KEY=
UNSPLASH_ACCESS_KEY=
UNSPLASH_SECRET_KEY=
```

## Where to get each key

- **Pexels**: https://www.pexels.com/api/ — free, instant.
- **Pixabay**: https://pixabay.com/api/docs/ — free, instant.
- **Unsplash**: https://unsplash.com/developers — free; new apps start in demo mode (50
  requests/hour), which is enough for development. `UNSPLASH_SECRET_KEY` isn't currently used by
  anything in this repo (only `UNSPLASH_ACCESS_KEY` is read) — it's in `.env.example` because
  Unsplash issues both together; leave it blank unless something here starts using it.

## What actually needs which key

- Poly Haven and Sketchfab searches (`npm run search-assets --sources polyhaven,sketchfab`) need
  **no key at all** — they're public APIs.
- Pexels/Pixabay/Unsplash searches need their respective key, or `search-assets` reports that
  source as failed (see `errors` in its JSON output) rather than crashing the whole search.
- Nothing under `src/` reads any of these — they're only loaded by `automation/env.ts`, which is
  imported exclusively by the Node-side scripts in `scripts/`. **No API key ever reaches the
  browser bundle or a deployed site.**

## How loading works

`automation/env.ts`'s `loadEnv()` calls Node's built-in `process.loadEnvFile('.env.local')` at
the top of every script in `scripts/`. If the file doesn't exist, it's silently skipped —
`requireEnv(name)` is what actually throws a clear error ("copy .env.example to .env.local and
set it") the moment a script tries to use a key that isn't set, rather than failing with an
opaque `401` deep inside a fetch call.
