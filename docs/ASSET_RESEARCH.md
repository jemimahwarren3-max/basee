# Asset research (Phase 4)

Node-side CLI tools under `automation/asset-search/`, `automation/asset-download/`, and
`scripts/`. These never run in the browser bundle — they're invoked directly (by you, or by
Claude Code acting on a brief) via `npm run search-assets` / `npm run download-asset`.

## Search

```
npm run search-assets -- --query "espresso pouring into a ceramic cup" --kind video
npm run search-assets -- --query "smoke" --kind video --orientation landscape --per-page 5
npm run search-assets -- --query "walnut veneer" --kind texture --sources polyhaven
```

Flags: `--query` (required), `--kind` (`video`/`image`/`model`/`texture`/`hdri`), `--orientation`
(`landscape`/`portrait`/`square`), `--sources` (comma-separated: `pexels,pixabay,unsplash,
polyhaven,sketchfab`), `--per-page`, `--min-width`, `--min-duration`, `--max-duration`.

Output is JSON on stdout: `{ results, errors, manualSources }`. `errors` lists which sources
failed (e.g. a missing API key) without blocking the others. `manualSources` lists sites with no
download API for the requested kind (Mixkit, Coverr, Videvo, Rawpixel, pngkey/pngegg/kindpng/
pngwing/pngitem) — surface those as links, never as something the engine downloaded.

## Download

Pick one result from the search JSON, save it to a file, then:

```
npm run download-asset -- --asset-file ./scratch/chosen-asset.json --project perfume-brand --intended-use hero
```

This writes the file to `media-library/<project>/<videos|images|models|textures>/` and appends
an entry to `media-library/<project>/manifest.json` (filename, source page, creator, license,
commercial-use flag, download date, intended use, processing history). It refuses to download
anything whose license doesn't permit commercial use unless you pass
`--force-non-commercial true` after a human has actually confirmed that specific use is fine.

## What's verified vs. what isn't

- **Poly Haven** (textures, HDRIs, models): live-tested in this repo, no API key needed. Picks
  real image/model files (`.jpg`/`.exr`/`.gltf`) over Poly Haven's non-image deliverables
  (`.mtlx` material graphs, `.blend` scenes) — don't widen that preference list without checking
  what format the destination component actually needs.
- **Sketchfab**: live-tested; search works without a key, and license is surfaced per result,
  but it deliberately never returns a `downloadUrl` — Sketchfab downloads need OAuth plus a
  per-model permission this API doesn't resolve, so that's always a manual, human-verified step.
- **Pexels, Pixabay, Unsplash**: implemented against each provider's documented API and
  type-check cleanly, but **not yet exercised against a live key** — this environment has none.
  Before trusting these for a real client brief, run a search with your own key in
  `.env.local` and confirm the shape of the response matches what's coded here.
