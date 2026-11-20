# Asset source notes (for Phase 4 — asset research)

Not implemented yet. This is a running note of source trustworthiness so Phase 4 doesn't wire up
scraping against sites the spec explicitly rules out.

## API-backed, safe to automate

- **Pexels** — official API, clear free-for-commercial-use license.
- **Pixabay** — official API, clear free-for-commercial-use license.
- **Unsplash** — official API, clear license (attribution appreciated, not required).
- **Poly Haven** — CC0, direct downloads, no auth needed for the public API.
- **Sketchfab** — API exists; license varies per model, must be checked per asset.
- **Mixkit / Coverr / Videvo** — no official download API; manual link + instructions only.
- **LottieFiles** — has an API for some tiers; license varies per animation.
- **Rawpixel** — large CC0/public-domain library; no simple official download API observed, so
  treat as manual-link-only like Mixkit/Coverr/Videvo.

## Flagged — manual link only, do not auto-download

**pngkey, pngegg, kindpng, pngwing, pngitem** — these are PNG/clipart aggregators with no
official API. They re-host images of uncertain original authorship and licensing is frequently
unclear or simply copied from elsewhere. Per the engine's own rule ("don't scrape restricted
sites, don't claim an asset's license is verified when it isn't"), these should never be
auto-downloaded or auto-attributed. If a client brief needs a specific transparent PNG/clipart
asset from one of these, Phase 4 should surface the source page as a manual link and require a
human to verify the license before it goes anywhere near a client deliverable.
