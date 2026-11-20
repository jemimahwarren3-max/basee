import type { TemplateTheme } from '../types'

export const ecommerceTheme: TemplateTheme = {
  name: 'E-commerce',
  direction:
    'Clean, fast, conversion-first. Bright and legible, motion is used to clarify product detail (comparisons, rotation), never to slow the path to checkout.',
  fitsBriefsLike: [
    'Direct-to-consumer product brand that needs a shop, not just a showcase',
    'A brand where "before/after" or product comparison genuinely matters (skincare, home goods)',
  ],
  colors: {
    background: '#ffffff',
    foreground: '#111111',
    accent: '#2457f0',
    muted: '#e4e4e7',
  },
  fonts: {
    heading: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  motion: { intensity: 'minimal', revealDuration: 0.4 },
  suggestedComponents: [
    'src/effects/BeforeAfterSlider',
    'src/3d/RotatingObject',
    'src/animations/ScrollReveal',
  ],
  suggestedLibraries: ['framer-motion'],
  avoid: [
    'src/effects/HorizontalScroll — adds friction to the shopping path',
    'src/video/ScrollSequence — heavy for mobile data/perf budgets that matter more here than elsewhere',
    'Long reveal durations — conversion pages should feel instant, not cinematic',
  ],
}
