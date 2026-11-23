import type { DesignFamily } from './types';

export const industrialManufacturing: DesignFamily = {
  id: 'industrial-manufacturing',
  name: 'Industrial & Manufacturing',
  description:
    'Robust and functional with strong structure and industrial aesthetics. For manufacturing, engineering, logistics, mining and heavy industry.',
  industries: [
    'manufacturing',
    'engineering',
    'logistics',
    'mining',
    'construction',
    'energy',
    'agriculture',
  ],
  personality: ['robust', 'reliable', 'functional', 'strong', 'industrial'],

  typography: {
    heading: '"Barlow", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    headingWeight: 700,
    bodyWeight: 400,
    headingTracking: '-0.01em',
    bodyLeading: '1.65',
    scale: 'compact',
  },

  colors: {
    background: '#FFFFFF',
    foreground: '#1A1A1A',
    primary: '#374151',
    secondary: '#6B7280',
    accent: '#D97706',
    muted: '#F3F4F6',
    mutedForeground: '#6B7280',
    border: '#D1D5DB',
    surface: '#F9FAFB',
    surfaceForeground: '#1A1A1A',
  },

  spacing: { density: 'tight', sectionGap: '5rem', componentGap: '2rem', contentWidth: '900px' },
  layout: {
    grid: 'symmetric',
    maxWidth: '1280px',
    preferredHero: ['hero-split-clean', 'hero-fullscreen', 'hero-text-centered'],
    preferredSections: [
      'services-grid',
      'stats-counter',
      'about-columns',
      'gallery-grid',
      'contact-form',
    ],
    avoidSections: ['gallery-masonry', 'testimonial-quote', 'hero-typographic'],
  },
  imagery: {
    treatment: 'full-color',
    corners: 'slight',
    aspectRatios: ['16:9', '4:3', '3:2'],
    overlays: true,
    parallax: false,
  },
  navigation: { style: 'solid', sticky: true, cta: true },
  animation: {
    intensity: 'none',
    reveals: false,
    parallax: false,
    microInteractions: true,
    pageTransitions: false,
  },
  buttons: { style: 'solid', corners: '4px', uppercase: true, tracking: '0.05em' },
};
