import { requireEnv } from '../env'
import type { AssetSearchOptions, AssetSearchResult, Orientation } from './types'

const LICENSE = {
  name: 'Unsplash License',
  commercialUse: true,
  attributionRequired: false,
  url: 'https://unsplash.com/license',
} as const

interface UnsplashPhoto {
  id: string
  width: number
  height: number
  links: { html: string }
  user: { name: string; links: { html: string } }
  urls: { regular: string; full: string }
}

function toOrientationParam(orientation?: Orientation): string | undefined {
  if (!orientation || orientation === 'square') return undefined
  return orientation
}

/** Searches Unsplash photos. https://unsplash.com/documentation#search-photos */
export async function searchUnsplashPhotos(
  options: AssetSearchOptions,
): Promise<AssetSearchResult[]> {
  const accessKey = requireEnv('UNSPLASH_ACCESS_KEY')
  const url = new URL('https://api.unsplash.com/search/photos')
  url.searchParams.set('query', options.query)
  url.searchParams.set('per_page', String(options.perPage ?? 10))
  const orientation = toOrientationParam(options.orientation)
  if (orientation) url.searchParams.set('orientation', orientation)

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  })
  if (!res.ok) {
    throw new Error(`Unsplash API error ${res.status}: ${await res.text()}`)
  }

  const data = (await res.json()) as { results: UnsplashPhoto[] }

  return data.results
    .filter((photo) => !options.minWidth || photo.width >= options.minWidth)
    .map((photo) => ({
      source: 'unsplash',
      sourceId: photo.id,
      kind: 'image',
      title: `Unsplash photo ${photo.id}`,
      sourcePageUrl: photo.links.html,
      creator: photo.user.name,
      creatorUrl: photo.user.links.html,
      license: LICENSE,
      previewUrl: photo.urls.regular,
      downloadUrl: photo.urls.full,
      width: photo.width,
      height: photo.height,
      orientation: photo.width >= photo.height ? 'landscape' : 'portrait',
    }))
}
