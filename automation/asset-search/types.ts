export type AssetKind = 'video' | 'image' | 'model' | 'texture' | 'hdri'

export type AssetSourceId = 'pexels' | 'pixabay' | 'unsplash' | 'polyhaven' | 'sketchfab'

export type Orientation = 'landscape' | 'portrait' | 'square'

export interface LicenseInfo {
  name: string
  /** Whether this source's license permits commercial use. Must be checked before download. */
  commercialUse: boolean
  attributionRequired: boolean
  url?: string
}

export interface AssetSearchResult {
  source: AssetSourceId
  /** The provider's own id for this asset, e.g. a Pexels photo id. */
  sourceId: string
  kind: AssetKind
  title: string
  sourcePageUrl: string
  creator: string
  creatorUrl?: string
  license: LicenseInfo
  previewUrl: string
  /**
   * Direct file URL, only present when the provider's API exposes a permitted, authenticated
   * download link. Absent means: surface the source page, do not auto-download.
   */
  downloadUrl?: string
  width?: number
  height?: number
  durationSeconds?: number
  orientation?: Orientation
}

export interface AssetSearchOptions {
  query: string
  kind?: AssetKind
  orientation?: Orientation
  minWidth?: number
  minDurationSeconds?: number
  maxDurationSeconds?: number
  perPage?: number
}
