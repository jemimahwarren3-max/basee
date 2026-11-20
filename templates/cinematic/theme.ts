import type { TemplateTheme } from '../types'

export const cinematicTheme: TemplateTheme = {
  name: 'Cinematic',
  direction:
    'Moody, high-contrast, film-grade. Dark backgrounds, slow confident motion, footage-driven storytelling.',
  fitsBriefsLike: [
    'Luxury perfume or fragrance brand with cinematic product footage',
    'Automotive showcase built around turntable/driving footage',
    'Film, production company, or any brand whose asset library is strong video',
  ],
  colors: {
    background: '#0a0a0a',
    foreground: '#f5f3ef',
    accent: '#c99a4b',
    muted: '#5a564f',
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Inter', system-ui, sans-serif",
  },
  motion: { intensity: 'maximal', revealDuration: 1 },
  suggestedComponents: [
    'src/video/ScrollSequence',
    'src/effects/Parallax',
    'src/effects/HorizontalScroll',
    'src/3d/RotatingObject',
    'src/effects/TextReveal',
    'src/animations/ScrollReveal',
  ],
  suggestedLibraries: ['gsap', 'lenis', 'three', '@react-three/fiber', '@react-three/drei'],
  avoid: [
    'Bright, high-key color palettes — fights the moody tone',
    'Dense body copy — this direction sells on footage and pacing, not paragraphs',
  ],
}
