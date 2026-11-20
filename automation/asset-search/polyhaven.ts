import type { AssetKind, AssetSearchOptions, AssetSearchResult } from './types'

const LICENSE = {
  name: 'CC0',
  commercialUse: true,
  attributionRequired: false,
  url: 'https://polyhaven.com/license',
} as const

type PolyHavenType = 'hdris' | 'textures' | 'models'

interface PolyHavenAssetSummary {
  name: string
  type: number // 0 = hdri, 1 = texture, 2 = model
  categories: string[]
}

// Poly Haven's /files/<id> response shape genuinely varies by asset type (HDRIs nest by
// resolution then format; textures nest by map type then resolution then format; models nest
// by format then resolution). We only need to find *a* usable download URL, so this walks the
// object generically rather than modeling every variant.
type PolyHavenFiles = Record<string, unknown>

// Preferred file extensions per asset kind, most-usable first. Poly Haven also exposes
// non-image deliverables (.mtlx material graphs, .blend scenes) that aren't what "a texture" or
// "an HDRI" means for a web pipeline, so those are deliberately absent from these lists.
const PREFERRED_EXTENSIONS: Record<AssetKind, string[]> = {
  hdri: ['.exr', '.hdr'],
  texture: ['.jpg', '.jpeg', '.png'],
  model: ['.gltf', '.glb'],
  video: [],
  image: [],
}

function collectFileUrls(node: unknown, out: string[]): void {
  if (!node || typeof node !== 'object') return
  const url = (node as { url?: unknown }).url
  if (typeof url === 'string') out.push(url)
  for (const value of Object.values(node)) collectFileUrls(value, out)
}

function pickBestFileUrl(files: PolyHavenFiles, kind: AssetKind): string | undefined {
  const urls: string[] = []
  collectFileUrls(files, urls)
  if (!urls.length) return undefined

  for (const ext of PREFERRED_EXTENSIONS[kind]) {
    const match = urls.find((url) => url.toLowerCase().endsWith(ext))
    if (match) return match
  }
  return undefined
}

function kindFromPolyHavenType(type: PolyHavenType): AssetKind {
  if (type === 'hdris') return 'hdri'
  if (type === 'textures') return 'texture'
  return 'model'
}

/**
 * Searches Poly Haven's public catalogue (3D models, textures, HDRIs). No API key required.
 * https://api.polyhaven.com/
 */
export async function searchPolyHaven(
  type: PolyHavenType,
  options: AssetSearchOptions,
): Promise<AssetSearchResult[]> {
  const listRes = await fetch(`https://api.polyhaven.com/assets?t=${type}`)
  if (!listRes.ok) {
    throw new Error(`Poly Haven API error ${listRes.status}: ${await listRes.text()}`)
  }
  const catalogue = (await listRes.json()) as Record<string, PolyHavenAssetSummary>

  const query = options.query.toLowerCase()
  const matchIds = Object.entries(catalogue)
    .filter(
      ([id, asset]) =>
        id.toLowerCase().includes(query) ||
        asset.name.toLowerCase().includes(query) ||
        asset.categories.some((c) => c.toLowerCase().includes(query)),
    )
    .slice(0, options.perPage ?? 10)
    .map(([id]) => id)

  const results: AssetSearchResult[] = []
  for (const id of matchIds) {
    const filesRes = await fetch(`https://api.polyhaven.com/files/${id}`)
    if (!filesRes.ok) continue
    const files = (await filesRes.json()) as PolyHavenFiles
    const kind = kindFromPolyHavenType(type)
    const downloadUrl = pickBestFileUrl(files, kind)

    results.push({
      source: 'polyhaven',
      sourceId: id,
      kind,
      title: catalogue[id].name,
      sourcePageUrl: `https://polyhaven.com/a/${id}`,
      creator: 'Poly Haven contributors',
      creatorUrl: 'https://polyhaven.com/',
      license: LICENSE,
      previewUrl: `https://cdn.polyhaven.com/asset_img/thumbs/${id}.png`,
      downloadUrl,
    })
  }
  return results
}
