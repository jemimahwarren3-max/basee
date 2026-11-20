import type { TemplateTheme } from '../types'

export const luxuryTheme: TemplateTheme = {
  name: 'Luxury',
  direction:
    'Black and gold, restrained and precise motion, generous negative space. Every animation reads as deliberate, never flashy.',
  fitsBriefsLike: [
    'Jewellery, watches, or fine leather goods',
    'Boutique hospitality or members-only service',
    'High-end beauty or perfume with a quieter, more editorial tone than "Cinematic"',
  ],
  colors: {
    background: '#0c0c0d',
    foreground: '#eae6dc',
    accent: '#d4af37',
    muted: '#2a2a2a',
  },
  fonts: {
    heading: "'Cormorant Garamond', serif",
    body: "'Inter', system-ui, sans-serif",
  },
  motion: { intensity: 'minimal', revealDuration: 1.1 },
  suggestedComponents: [
    'src/animations/ScrollReveal',
    'src/effects/Parallax',
    'src/effects/TextReveal',
    'src/3d/RotatingObject',
  ],
  suggestedLibraries: ['gsap', 'lenis', 'three', '@react-three/fiber', '@react-three/drei'],
  avoid: [
    'src/effects/HorizontalScroll — too playful/attention-grabbing for this register',
    'Fast stagger timings or bouncy eases — undermines the restrained feel',
  ],
}
