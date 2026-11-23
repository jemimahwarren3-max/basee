import type { DesignFamily } from './types';

export const editorialLuxury: DesignFamily = {
  id: 'editorial-luxury',
  name: 'Editorial Luxury',
  description:
    'Refined elegance with generous whitespace, serif typography and cinematic imagery. For luxury brands, boutique hotels, high-end architecture and fashion houses.',
  industries: ['luxury', 'hotels', 'architecture', 'fashion', 'jewellery', 'wine', 'fine-dining'],
  personality: ['elegant', 'refined', 'exclusive', 'timeless', 'sophisticated'],

  typography: {
    heading: '"Playfair Display", Georgia, serif',
    body: '"Inter", system-ui, sans-serif',
    accent: '"Cormorant Garamond", Georgia, serif',
    headingWeight: 400,
    bodyWeight: 400,
    headingTracking: '-0.02em',
    bodyLeading: '1.75',
    scale: 'dramatic',
  },

  colors: {
    background: '#FAFAF8',
    foreground: '#1A1A1A',
    primary: '#8B7355',
    secondary: '#D4C5B2',
    accent: '#C4956A',
    muted: '#F5F3EF',
    mutedForeground: '#6B6560',
    border: '#E8E4DE',
    surface: '#FFFFFF',
    surfaceForeground: '#1A1A1A',
  },

  spacing: {
    density: 'editorial',
    sectionGap: '10rem',
    componentGap: '4rem',
    contentWidth: '720px',
  },

  layout: {
    grid: 'editorial',
    maxWidth: '1440px',
    preferredHero: ['hero-cinematic', 'hero-split', 'hero-editorial'],
    preferredSections: ['about-editorial', 'gallery-masonry', 'testimonial-quote'],
    avoidSections: ['pricing-cards', 'stats-counter'],
  },

  imagery: {
    treatment: 'warm',
    corners: 'sharp',
    aspectRatios: ['16:9', '3:4', '2:3'],
    overlays: true,
    parallax: true,
  },

  navigation: {
    style: 'transparent',
    sticky: true,
    cta: true,
  },

  animation: {
    intensity: 'subtle',
    reveals: true,
    parallax: true,
    microInteractions: true,
    pageTransitions: false,
  },

  buttons: {
    style: 'outline',
    corners: '0',
    uppercase: true,
    tracking: '0.15em',
  },
};
