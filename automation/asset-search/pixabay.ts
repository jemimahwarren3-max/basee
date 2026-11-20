import { requireEnv } from '../env'
import type { AssetSearchOptions, AssetSearchResult, Orientation } from './types'

const LICENSE = {
  name: 'Pixabay Content License',
  commercialUse: true,
  attributionRequired: false,
  url: 'https://pixabay.com/service/license/',
} as const

interface PixabayImageHit {
  id: number
  pageURL: string
  user: string
  imageWidth: number
  imageHeight: number
  previewURL: string
  largeImageURL: string
}

interface PixabayVideoHit {
  id: number
  pageURL: string
  user: string
  duration: number
  videos: {
    large: { url: string; width: number; height: number }
    medium: { url: string; width: number; height: number }
  }
  picture_id: string
}

function toOrientationParam(orientation?: Orientation): string | undefined {
  if (!orientation) return undefined
  if (orientation === 'square') return undefined
  return orientation
}

async function pixabayFetch<T>(path: string, params: Record<string, string>): Promise<T> {
  const apiKey = requireEnv('PIXABAY_API_KEY')
  const url = new URL(`https://pixabay.com${path}`)
  url.searchParams.set('key', apiKey)
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value)

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Pixabay API error ${res.status}: ${await res.text()}`)
  }
  return (await res.json()) as T
}

/** Searches Pixabay photos. https://pixabay.com/api/docs/#api_search_images */
export async function searchPixabayPhotos(
  options: AssetSearchOptions,
): Promise<AssetSearchResult[]> {
  const params: Record<string, string> = {
    q: options.query,
    image_type: 'photo',
    per_page: String(Math.max(3, options.perPage ?? 10)),
  }
  const orientation = toOrientationParam(options.orientation)
  if (orientation) params.orientation = orientation
  if (options.minWidth) params.min_width = String(options.minWidth)

  const data = await pixabayFetch<{ hits: PixabayImageHit[] }>('/api/', params)

  return data.hits.map((hit) => ({
    source: 'pixabay',
    sourceId: String(hit.id),
    kind: 'image',
    title: `Pixabay photo ${hit.id}`,
    sourcePageUrl: hit.pageURL,
    creator: hit.user,
    license: LICENSE,
    previewUrl: hit.previewURL,
    downloadUrl: hit.largeImageURL,
    width: hit.imageWidth,
    height: hit.imageHeight,
    orientation: hit.imageWidth >= hit.imageHeight ? 'landscape' : 'portrait',
  }))
}

/** Searches Pixabay videos. https://pixabay.com/api/docs/#api_search_videos */
export async function searchPixabayVideos(
  options: AssetSearchOptions,
): Promise<AssetSearchResult[]> {
  const params: Record<string, string> = {
    q: options.query,
    per_page: String(Math.max(3, options.perPage ?? 10)),
  }

  const data = await pixabayFetch<{ hits: PixabayVideoHit[] }>('/api/videos/', params)

  return data.hits
    .filter((hit) => {
      if (options.minDurationSeconds && hit.duration < options.minDurationSeconds) return false
      if (options.maxDurationSeconds && hit.duration > options.maxDurationSeconds) return false
      return true
    })
    .map((hit) => {
      const best = hit.videos.large.url ? hit.videos.large : hit.videos.medium
      return {
        source: 'pixabay',
        sourceId: String(hit.id),
        kind: 'video',
        title: `Pixabay video ${hit.id}`,
        sourcePageUrl: hit.pageURL,
        creator: hit.user,
        license: { ...LICENSE, name: 'Pixabay Content License (video)' },
        previewUrl: `https://i.vimeocdn.com/video/${hit.picture_id}_640x360.jpg`,
        downloadUrl: best.url,
        width: best.width,
        height: best.height,
        durationSeconds: hit.duration,
        orientation: best.width >= best.height ? 'landscape' : 'portrait',
      } satisfies AssetSearchResult
    })
}
