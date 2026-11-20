import { MANUAL_SOURCES } from './manualSources'
import { searchPexelsPhotos, searchPexelsVideos } from './pexels'
import { searchPixabayPhotos, searchPixabayVideos } from './pixabay'
import { searchPolyHaven } from './polyhaven'
import { searchSketchfab } from './sketchfab'
import type { AssetSearchOptions, AssetSearchResult, AssetSourceId } from './types'
import { searchUnsplashPhotos } from './unsplash'

export * from './manualSources'
export * from './types'

export const API_SOURCES: AssetSourceId[] = ['pexels', 'pixabay', 'unsplash', 'polyhaven', 'sketchfab']

interface SearchAllOptions extends AssetSearchOptions {
  sources?: AssetSourceId[]
}

/**
 * Runs an asset search across every requested API-backed source and returns normalized,
 * license-annotated results. Each provider call is isolated — one source failing (e.g. a
 * missing API key) doesn't block results from the others; the failure is reported instead.
 */
export async function searchAssets(
  options: SearchAllOptions,
): Promise<{ results: AssetSearchResult[]; errors: { source: AssetSourceId; message: string }[] }> {
  const sources = options.sources ?? API_SOURCES
  const results: AssetSearchResult[] = []
  const errors: { source: AssetSourceId; message: string }[] = []

  const tasks: { source: AssetSourceId; run: () => Promise<AssetSearchResult[]> }[] = []

  if (sources.includes('pexels')) {
    if (!options.kind || options.kind === 'video') {
      tasks.push({ source: 'pexels', run: () => searchPexelsVideos(options) })
    }
    if (!options.kind || options.kind === 'image') {
      tasks.push({ source: 'pexels', run: () => searchPexelsPhotos(options) })
    }
  }
  if (sources.includes('pixabay')) {
    if (!options.kind || options.kind === 'video') {
      tasks.push({ source: 'pixabay', run: () => searchPixabayVideos(options) })
    }
    if (!options.kind || options.kind === 'image') {
      tasks.push({ source: 'pixabay', run: () => searchPixabayPhotos(options) })
    }
  }
  if (sources.includes('unsplash') && (!options.kind || options.kind === 'image')) {
    tasks.push({ source: 'unsplash', run: () => searchUnsplashPhotos(options) })
  }
  if (sources.includes('polyhaven') && (!options.kind || options.kind === 'hdri')) {
    tasks.push({ source: 'polyhaven', run: () => searchPolyHaven('hdris', options) })
  }
  if (sources.includes('polyhaven') && (!options.kind || options.kind === 'texture')) {
    tasks.push({ source: 'polyhaven', run: () => searchPolyHaven('textures', options) })
  }
  if (sources.includes('polyhaven') && (!options.kind || options.kind === 'model')) {
    tasks.push({ source: 'polyhaven', run: () => searchPolyHaven('models', options) })
  }
  if (sources.includes('sketchfab') && (!options.kind || options.kind === 'model')) {
    tasks.push({ source: 'sketchfab', run: () => searchSketchfab(options) })
  }

  await Promise.all(
    tasks.map(async (task) => {
      try {
        results.push(...(await task.run()))
      } catch (error) {
        errors.push({
          source: task.source,
          message: error instanceof Error ? error.message : String(error),
        })
      }
    }),
  )

  return { results, errors }
}

/** Sources with no download API — always surface as manual links, never auto-download. */
export function manualSourcesFor(kind?: string) {
  return MANUAL_SOURCES.filter((source) => !kind || source.kinds.includes(kind))
}
