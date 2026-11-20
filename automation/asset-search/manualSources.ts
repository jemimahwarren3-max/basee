export interface ManualSource {
  name: string
  url: string
  kinds: string[]
  note: string
  licenseTrust: 'clear' | 'unclear'
}

/**
 * Sources with no official download API. The engine must never claim a download happened for
 * these — only surface the source page and let a human fetch and license-check the file.
 */
export const MANUAL_SOURCES: ManualSource[] = [
  {
    name: 'Mixkit',
    url: 'https://mixkit.co/free-stock-video/',
    kinds: ['video'],
    note: 'Free stock video, no API. Clear license (Mixkit License, free for commercial use).',
    licenseTrust: 'clear',
  },
  {
    name: 'Coverr',
    url: 'https://coverr.co/stock-video-footage/',
    kinds: ['video'],
    note: 'Free stock video, no API. Clear license.',
    licenseTrust: 'clear',
  },
  {
    name: 'Videvo',
    url: 'https://www.videvo.net/',
    kinds: ['video'],
    note: 'Mix of free and paid clips, no API. Check per-clip license before use.',
    licenseTrust: 'clear',
  },
  {
    name: 'LottieFiles',
    url: 'https://lottiefiles.com/',
    kinds: ['animation'],
    note: 'Animations have per-file licenses; API access exists on some tiers. Verify per asset.',
    licenseTrust: 'clear',
  },
  {
    name: 'Rawpixel',
    url: 'https://www.rawpixel.com/',
    kinds: ['image'],
    note: 'Large CC0/public-domain library, no simple official download API observed.',
    licenseTrust: 'clear',
  },
  {
    name: 'pngkey',
    url: 'https://www.pngkey.com/',
    kinds: ['image'],
    note: 'PNG/clipart aggregator. No API. Re-hosted content with frequently unclear original '
      + 'authorship and licensing — verify by hand before any client use.',
    licenseTrust: 'unclear',
  },
  {
    name: 'pngegg',
    url: 'https://www.pngegg.com/',
    kinds: ['image'],
    note: 'PNG/clipart aggregator. No API. Same licensing caveat as pngkey.',
    licenseTrust: 'unclear',
  },
  {
    name: 'KindPNG',
    url: 'https://www.kindpng.com/',
    kinds: ['image'],
    note: 'PNG/clipart aggregator. No API. Same licensing caveat as pngkey.',
    licenseTrust: 'unclear',
  },
  {
    name: 'PNGItem',
    url: 'https://www.pngitem.com/',
    kinds: ['image'],
    note: 'PNG/clipart aggregator. No API. Same licensing caveat as pngkey.',
    licenseTrust: 'unclear',
  },
  {
    name: 'PNGWing',
    url: 'https://www.pngwing.com/',
    kinds: ['image'],
    note: 'PNG/clipart aggregator. No API. Same licensing caveat as pngkey.',
    licenseTrust: 'unclear',
  },
]
