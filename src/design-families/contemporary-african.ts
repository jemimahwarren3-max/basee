import type { DesignFamily } from './types';

export const contemporaryAfrican: DesignFamily = {
  id: 'contemporary-african',
  name: 'Contemporary African',
  description:
    'Rich earth tones with bold patterns, vibrant accents and expressive typography. For African brands, cultural enterprises, creative businesses and diaspora ventures.',
  industries: ['african-brand', 'cultural', 'creative', 'diaspora', 'textile', 'artisan', 'safari'],
  personality: ['vibrant', 'cultural', 'bold', 'authentic', 'expressive', 'grounded'],

  typography: {
    heading: '"Sora", system-ui, sans-serif',
    body: '"DM Sans", system-ui, sans-serif',
    accent: '"Playfair Display", Georgia, serif',
    headingWeight: 700,
    bodyWeight: 400,
    headingTracking: '-0.01em',
    bodyLeading: '1.75',
    scale: 'dramatic',
  },

  colors: {
    background: '#FDF6EC',
    foreground: '#1A1206',
    primary: '#C15A24',
    secondary: '#D4A253',
    accent: '#2D6A4F',
    muted: '#F4EBD9',
    mutedForeground: '#6B5B3E',
    border: '#DDD0B8',
    surface: '#FFFFFF',
    surfaceForeground: '#1A1206',
  },

  spacing: { density: 'spacious', sectionGap: '9rem', componentGap: '4rem', contentWidth: '800px' },
  layout: {
    grid: 'asymmetric',
    maxWidth: '1400px',
    preferredHero: ['hero-fullscreen', 'hero-asymmetric', 'hero-editorial'],
    preferredSections: ['gallery-editorial', 'about-story', 'testimonial-quote', 'cta-image'],
    avoidSections: ['pricing-cards', 'features-bento'],
  },
  imagery: {
    treatment: 'warm',
    corners: 'sharp',
    aspectRatios: ['16:9', '3:2', '4:5'],
    overlays: true,
    parallax: true,
  },
  navigation: { style: 'transparent', sticky: true, cta: true },
  animation: {
    intensity: 'moderate',
    reveals: true,
    parallax: true,
    microInteractions: true,
    pageTransitions: false,
  },
  buttons: { style: 'solid', corners: '0', uppercase: true, tracking: '0.08em' },
};
