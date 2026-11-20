import { requireEnv } from '../env'
import type { AssetSearchOptions, AssetSearchResult, Orientation } from './types'

const PHOTO_LICENSE = {
  name: 'Pexels License',
  commercialUse: true,
  attributionRequired: false,
  url: 'https://www.pexels.com/license/',
} as const

interface PexelsPhoto {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  src: { original: string; large2x: string }
}

interface PexelsVideoFile {
  link: string
  width: number
  height: number
  quality: string
  file_type: string
}

interface PexelsVideo {
  id: number
  width: number
  height: number
  duration: number
  url: string
  image: string
  user: { name: string; url: string }
  video_files: PexelsVideoFile[]
}

function toOrientationParam(orientation?: Orientation): string | undefined {
  if (!orientation) return undefined
  return orientation
}

async function pexelsFetch<T>(path: string, params: Record<string, string>): Promise<T> {
  const apiKey = requireEnv('PEXELS_API_KEY')
  const url = new URL(`https://api.pexels.com${path}`)
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value)

  const res = await fetch(url, { headers: { Authorization: apiKey } })
  if (!res.ok) {
    throw new Error(`Pexels API error ${res.status}: ${await res.text()}`)
  }
  return (await res.json()) as T
}

/** Searches Pexels photos. https://www.pexels.com/api/documentation/#photos-search */
export async function searchPexelsPhotos(
  options: AssetSearchOptions,
): Promise<AssetSearchResult[]> {
  const params: Record<string, string> = {
    query: options.query,
    per_page: String(options.perPage ?? 10),
  }
  const orientation = toOrientationParam(options.orientation)
  if (orientation) params.orientation = orientation

  const data = await pexelsFetch<{ photos: PexelsPhoto[] }>('/v1/search', params)

  return data.photos
    .filter((photo) => !options.minWidth || photo.width >= options.minWidth)
    .map((photo) => ({
      source: 'pexels',
      sourceId: String(photo.id),
      kind: 'image',
      title: `Pexels photo ${photo.id}`,
      sourcePageUrl: photo.url,
      creator: photo.photographer,
      creatorUrl: photo.photographer_url,
      license: PHOTO_LICENSE,
      previewUrl: photo.src.large2x,
      downloadUrl: photo.src.original,
      width: photo.width,
      height: photo.height,
      orientation: photo.width >= photo.height ? 'landscape' : 'portrait',
    }))
}

/** Searches Pexels videos. https://www.pexels.com/api/documentation/#videos-search */
export async function searchPexelsVideos(
  options: AssetSearchOptions,
): Promise<AssetSearchResult[]> {
  const params: Record<string, string> = {
    query: options.query,
    per_page: String(options.perPage ?? 10),
  }
  const orientation = toOrientationParam(options.orientation)
  if (orientation) params.orientation = orientation

  const data = await pexelsFetch<{ videos: PexelsVideo[] }>('/videos/search', params)

  return data.videos
    .filter((video) => {
      if (options.minWidth && video.width < options.minWidth) return false
      if (options.minDurationSeconds && video.duration < options.minDurationSeconds) return false
      if (options.maxDurationSeconds && video.duration > options.maxDurationSeconds) return false
      return true
    })
    .map((video) => {
      const bestFile = [...video.video_files]
        .filter((f) => f.file_type === 'video/mp4')
        .sort((a, b) => b.width - a.width)[0]

      return {
        source: 'pexels',
        sourceId: String(video.id),
        kind: 'video',
        title: `Pexels video ${video.id}`,
        sourcePageUrl: video.url,
        creator: video.user.name,
        creatorUrl: video.user.url,
        license: { ...PHOTO_LICENSE, name: 'Pexels License (video)' },
        previewUrl: video.image,
        downloadUrl: bestFile?.link,
        width: video.width,
        height: video.height,
        durationSeconds: video.duration,
        orientation: video.width >= video.height ? 'landscape' : 'portrait',
      } satisfies AssetSearchResult
    })
}
