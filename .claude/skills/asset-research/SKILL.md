---
name: asset-research
description: Search Pexels/Pixabay/Unsplash/Poly Haven/Sketchfab for exact, specific footage/images/3D assets, check licensing, and download permitted ones into media-library/ with a manifest. Use after creative-direction has a design spec.
---

# Asset research

Find the exact visual material a design spec calls for — not generic stock, the specific shot
described (e.g. "espresso pouring into a ceramic cup," not "coffee").

## What actually exists to work with

- `npm run search-assets -- --query "<description>" --kind <video|image|model|texture|hdri>`
  searches Pexels, Pixabay, Unsplash, Poly Haven, and Sketchfab in parallel and returns
  normalized, license-annotated JSON. See [docs/ASSET_RESEARCH.md](../../docs/ASSET_RESEARCH.md).
- **Verified live**: Poly Haven and Sketchfab search work with no API key. **Not yet verified
  against a real key**: Pexels, Pixabay, Unsplash — they're implemented against each provider's
  documented API, but confirm the response shape with a real `.env.local` key before trusting a
  result blindly in a client deliverable.
- `manualSourcesFor(kind)` lists sites with no download API (Mixkit, Coverr, Videvo, Rawpixel,
  LottieFiles, and the pngkey/pngegg/kindpng/pngwing/pngitem aggregators — the last five flagged
  `licenseTrust: 'unclear'`, re-hosted content of uncertain origin). **Never claim a download
  happened for these** — surface the source page as a link for a human to fetch and verify.
- `npm run download-asset -- --asset-file <json> --project <slug> --intended-use <use>` downloads
  one chosen result and appends a manifest entry (filename, source page, creator, license,
  commercial-use flag, date, intended use) to `media-library/<project>/manifest.json`. It
  **refuses** anything whose license doesn't permit commercial use unless a human explicitly
  passes `--force-non-commercial true` after confirming that specific use is fine.

## Process

1. For each asset the design spec needs, write a specific search query describing the actual
   action/framing/lighting — not a one-word category.
2. Run `search-assets`, compare results by composition/duration/resolution, pick one.
3. Download it via `download-asset` with an honest `--intended-use` (hero, background,
   scroll-sequence, product-reveal, etc. — this goes straight into the manifest).
4. If nothing from the API sources fits, check `manualSourcesFor` and hand the source page to
   the user rather than guessing a download URL.
5. Never purchase anything or touch a paid tier without asking first.
