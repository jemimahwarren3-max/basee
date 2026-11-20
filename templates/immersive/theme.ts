import type { TemplateTheme } from '../types'

export const immersiveTheme: TemplateTheme = {
  name: 'Immersive',
  direction:
    'Full-bleed storytelling built on 3D environments and scroll-driven sequences — the site is a space to move through, not a page to read.',
  fitsBriefsLike: [
    'Resort/travel brand with strong aerial and environment footage',
    'A brand launch that wants a single scroll-driven narrative rather than conventional sections',
  ],
  colors: {
    background: '#06080c',
    foreground: '#eef3f7',
    accent: '#3fb8c4',
    muted: '#2d3640',
  },
  fonts: {
    heading: "'Space Grotesk', sans-serif",
    body: "'Inter', system-ui, sans-serif",
  },
  motion: { intensity: 'maximal', revealDuration: 1 },
  suggestedComponents: [
    'src/video/ScrollSequence',
    'src/3d/RotatingObject',
    'src/effects/Parallax',
    'src/effects/HorizontalScroll',
  ],
  suggestedLibraries: ['three', '@react-three/fiber', '@react-three/drei', 'gsap', 'lenis'],
  avoid: [
    'Dense text blocks — this direction communicates through space and motion, not copy',
    'Skipping the prefers-reduced-motion fallback — this is the highest-motion template, so it needs it most',
  ],
}
