import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { AssetSearchResult } from '../asset-search/types'
import { appendManifestEntry } from './manifest'

const KIND_FOLDER: Record<AssetSearchResult['kind'], string> = {
  video: 'videos',
  image: 'images',
  model: 'models',
  texture: 'textures',
  // Poly Haven HDRIs have no dedicated media-library folder in the spec; textures/ is the
  // closest fit (both are environment/surface maps consumed the same way by Three.js).
  hdri: 'textures',
}

export interface DownloadAssetOptions {
  projectSlug: string
  intendedUse: string
  /** Override the filename written to disk; defaults to `<source>-<sourceId><ext>`. */
  filename?: string
  /** Required to download an asset whose license doesn't permit commercial use. */
  forceNonCommercial?: boolean
}

function guessExtension(url: string, kind: AssetSearchResult['kind']): string {
  const fromUrl = path.extname(new URL(url).pathname)
  if (fromUrl) return fromUrl
  return kind === 'video' ? '.mp4' : '.jpg'
}

/**
 * Downloads one search result to disk and records it in the project's manifest. Refuses assets
 * whose license doesn't permit commercial use unless explicitly overridden — this is the one
 * enforcement point that keeps an unlicensed asset from silently ending up in a client build.
 */
export async function downloadAsset(
  asset: AssetSearchResult,
  options: DownloadAssetOptions,
): Promise<string> {
  if (!asset.downloadUrl) {
    throw new Error(
      `${asset.source} asset "${asset.title}" has no direct download URL. Surface ` +
        `${asset.sourcePageUrl} to the user instead of attempting to download it.`,
    )
  }
  if (!asset.license.commercialUse && !options.forceNonCommercial) {
    throw new Error(
      `${asset.source} asset "${asset.title}" is licensed "${asset.license.name}", which does ` +
        'not permit commercial use. Pass forceNonCommercial: true only if a human has confirmed ' +
        'this specific use is permitted.',
    )
  }

  const res = await fetch(asset.downloadUrl)
  if (!res.ok) {
    throw new Error(`Download failed (${res.status}) for ${asset.downloadUrl}`)
  }

  const filename =
    options.filename ?? `${asset.source}-${asset.sourceId}${guessExtension(asset.downloadUrl, asset.kind)}`
  const dir = path.join('media-library', options.projectSlug, KIND_FOLDER[asset.kind])
  const filePath = path.join(dir, filename)

  await mkdir(dir, { recursive: true })
  await writeFile(filePath, Buffer.from(await res.arrayBuffer()))

  // Unsplash's API terms require pinging their download-tracking endpoint whenever a photo
  // obtained via the API is actually used, separate from fetching the file itself.
  if (asset.source === 'unsplash') {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY
    if (accessKey) {
      await fetch(`https://api.unsplash.com/photos/${asset.sourceId}/download`, {
        headers: { Authorization: `Client-ID ${accessKey}` },
      }).catch(() => {
        // Tracking ping failing shouldn't block the download that already succeeded.
      })
    }
  }

  await appendManifestEntry(options.projectSlug, {
    filename,
    sourcePageUrl: asset.sourcePageUrl,
    source: asset.source,
    creator: asset.creator,
    license: asset.license.name,
    commercialUsePermitted: asset.license.commercialUse,
    downloadedAt: new Date().toISOString(),
    intendedUse: options.intendedUse,
    processingHistory: [],
  })

  return filePath
}
