import type { AssetSearchOptions, AssetSearchResult } from './types'

interface SketchfabResult {
  uid: string
  name: string
  viewerUrl: string
  user: { displayName: string; profileUrl: string }
  license: { label: string; slug: string } | null
  thumbnails: { images: { url: string; width: number }[] }
}

/**
 * Searches Sketchfab models. No API key required for public search, but Sketchfab license
 * terms vary per model (CC0, CC-BY, "Editorial", "Standard" with no commercial redistribution,
 * etc.) — this never returns a downloadUrl. Download requires Sketchfab's own authenticated
 * flow and a per-model permission check that a human must make.
 * https://sketchfab.com/developers/data-api/v3/search
 */
export async function searchSketchfab(options: AssetSearchOptions): Promise<AssetSearchResult[]> {
  const url = new URL('https://api.sketchfab.com/v3/search')
  url.searchParams.set('type', 'models')
  url.searchParams.set('q', options.query)
  url.searchParams.set('downloadable', 'true')
  url.searchParams.set('count', String(options.perPage ?? 10))

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Sketchfab API error ${res.status}: ${await res.text()}`)
  }

  const data = (await res.json()) as { results: SketchfabResult[] }

  return data.results.map((model) => ({
    source: 'sketchfab',
    sourceId: model.uid,
    kind: 'model',
    title: model.name,
    sourcePageUrl: model.viewerUrl,
    creator: model.user.displayName,
    creatorUrl: model.user.profileUrl,
    license: {
      name: model.license?.label ?? 'Unknown — verify on model page before use',
      commercialUse: model.license?.slug === 'cc0' || model.license?.slug === 'cc-by',
      attributionRequired: model.license?.slug !== 'cc0',
      url: model.viewerUrl,
    },
    previewUrl: model.thumbnails.images[0]?.url ?? '',
    // Intentionally no downloadUrl: Sketchfab downloads require OAuth plus a per-model
    // permission the API doesn't fully resolve. Surface the source page for a human to verify.
  }))
}
