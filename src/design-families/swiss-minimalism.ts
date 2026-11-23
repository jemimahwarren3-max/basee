import type { DesignFamily } from './types';

export const swissMinimalism: DesignFamily = {
  id: 'swiss-minimalism',
  name: 'Swiss Minimalism',
  description:
    'Clean grid-based precision with strong typographic hierarchy. For consultancies, law firms, professional services and corporate brands.',
  industries: [
    'consulting',
    'legal',
    'finance',
    'corporate',
    'professional-services',
    'accounting',
  ],
  personality: ['precise', 'trustworthy', 'clean', 'authoritative', 'professional'],

  typography: {
    heading: '"Helvetica Neue", "Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    headingWeight: 700,
    bodyWeight: 400,
    headingTracking: '-0.03em',
    bodyLeading: '1.65',
    scale: 'moderate',
  },

  colors: {
    background: '#FFFFFF',
    foreground: '#111111',
    primary: '#111111',
    secondary: '#555555',
    accent: '#0066CC',
    muted: '#F7F7F7',
    mutedForeground: '#666666',
    border: '#E5E5E5',
    surface: '#FAFAFA',
    surfaceForeground: '#111111',
  },

  spacing: {
    density: 'balanced',
    sectionGap: '7rem',
    componentGap: '3rem',
    contentWidth: '800px',
  },

  layout: {
    grid: 'symmetric',
    maxWidth: '1200px',
    preferredHero: ['hero-text-centered', 'hero-minimal', 'hero-split-clean'],
    preferredSections: ['services-grid', 'about-columns', 'stats-minimal'],
    avoidSections: ['gallery-masonry', 'hero-cinematic'],
  },

  imagery: {
    treatment: 'high-contrast',
    corners: 'sharp',
    aspectRatios: ['16:9', '1:1', '4:3'],
    overlays: false,
    parallax: false,
  },

  navigation: {
    style: 'solid',
    sticky: true,
    cta: true,
  },

  animation: {
    intensity: 'subtle',
    reveals: true,
    parallax: false,
    microInteractions: true,
    pageTransitions: false,
  },

  buttons: {
    style: 'solid',
    corners: '4px',
    uppercase: false,
    tracking: '0',
  },
};
