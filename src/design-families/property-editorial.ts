import type { DesignFamily } from './types';

export const propertyEditorial: DesignFamily = {
  id: 'property-editorial',
  name: 'Property Editorial',
  description:
    'Architectural precision with large imagery and clean information hierarchy. For real estate agencies, property developers, luxury rentals and estates.',
  industries: ['real-estate', 'property-development', 'rentals', 'estates', 'interior-design'],
  personality: ['premium', 'aspirational', 'trustworthy', 'spacious', 'architectural'],

  typography: {
    heading: '"Outfit", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    headingWeight: 500,
    bodyWeight: 400,
    headingTracking: '-0.02em',
    bodyLeading: '1.7',
    scale: 'moderate',
  },

  colors: {
    background: '#FFFFFF',
    foreground: '#1C1C1C',
    primary: '#2D3436',
    secondary: '#636E72',
    accent: '#B8860B',
    muted: '#F5F6F8',
    mutedForeground: '#636E72',
    border: '#E0E0E0',
    surface: '#FAFBFC',
    surfaceForeground: '#1C1C1C',
  },

  spacing: {
    density: 'spacious',
    sectionGap: '8rem',
    componentGap: '3rem',
    contentWidth: '800px',
  },

  layout: {
    grid: 'asymmetric',
    maxWidth: '1440px',
    preferredHero: ['hero-fullscreen', 'hero-split', 'hero-parallax'],
    preferredSections: ['gallery-grid', 'about-columns', 'contact-map', 'stats-minimal'],
    avoidSections: ['pricing-cards', 'testimonial-cards'],
  },

  imagery: {
    treatment: 'full-color',
    corners: 'sharp',
    aspectRatios: ['16:9', '4:3', '3:2'],
    overlays: true,
    parallax: true,
  },
  navigation: { style: 'transparent', sticky: true, cta: true },
  animation: {
    intensity: 'subtle',
    reveals: true,
    parallax: true,
    microInteractions: true,
    pageTransitions: false,
  },
  buttons: { style: 'solid', corners: '0', uppercase: true, tracking: '0.1em' },
};
