import type { TemplateTheme } from '../types'

export const creativeTheme: TemplateTheme = {
  name: 'Creative',
  direction:
    'Bold, experimental, portfolio-energy. Willing to break grid conventions; motion is part of the brand voice, not decoration on top of it.',
  fitsBriefsLike: [
    'Design/creative agency portfolio',
    'An artist, photographer, or studio that wants the site itself to read as a piece of work',
  ],
  colors: {
    background: '#fafaf7',
    foreground: '#0d0d0d',
    accent: '#ff4d2e',
    muted: '#cfcac0',
  },
  fonts: {
    heading: "'Clash Display', 'Inter', sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  motion: { intensity: 'maximal', revealDuration: 0.7 },
  suggestedComponents: [
    'src/effects/HorizontalScroll',
    'src/effects/TextReveal',
    'src/effects/Parallax',
    'src/animations/ScrollReveal',
  ],
  suggestedLibraries: ['gsap', 'framer-motion', 'lenis'],
  avoid: [
    'Safe, centered, three-column layouts — defeats the point of this direction',
    'Reusing another client\'s exact layout structure — this direction above all others should look different every time',
  ],
}
