import type { TemplateTheme } from '../types'

export const editorialTheme: TemplateTheme = {
  name: 'Editorial',
  direction:
    'Minimal, type-led, grid-based. Reads like a well-set magazine, not a product demo — motion supports reading rhythm, never competes with it.',
  fitsBriefsLike: [
    'Design studio, writer, or publication portfolio',
    'A brand whose content is substantial (articles, case studies) rather than product shots',
    'Scrapbook/collage-style sites with torn paper, layered photography, mixed typography',
  ],
  colors: {
    background: '#f7f5f0',
    foreground: '#1a1a1a',
    accent: '#c1443d',
    muted: '#9b968c',
  },
  fonts: {
    heading: "'Fraunces', serif",
    body: "'Inter', system-ui, sans-serif",
  },
  motion: { intensity: 'moderate', revealDuration: 0.6 },
  suggestedComponents: ['src/effects/TextReveal', 'src/animations/ScrollReveal', 'src/effects/Parallax'],
  suggestedLibraries: ['gsap', 'framer-motion'],
  avoid: [
    'src/3d/RotatingObject and other 3D scenes — wrong register for a type-led, print-inspired direction',
    'src/video/ScrollSequence — this direction is built on type and layout, not footage',
  ],
}
