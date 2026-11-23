import type { DesignFamily } from './types';

export const minimalistPortfolio: DesignFamily = {
  id: 'minimalist-portfolio',
  name: 'Minimalist Portfolio',
  description:
    'Maximum impact through restraint. Work speaks for itself with clean grids and no visual clutter. For photographers, designers, artists and freelancers.',
  industries: ['photographer', 'designer', 'artist', 'freelancer', 'illustrator', 'filmmaker'],
  personality: ['minimal', 'confident', 'focused', 'artistic', 'refined'],

  typography: {
    heading: '"Syne", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    headingWeight: 600,
    bodyWeight: 400,
    headingTracking: '-0.03em',
    bodyLeading: '1.65',
    scale: 'moderate',
  },

  colors: {
    background: '#FFFFFF',
    foreground: '#0A0A0A',
    primary: '#0A0A0A',
    secondary: '#666666',
    accent: '#0A0A0A',
    muted: '#F5F5F5',
    mutedForeground: '#888888',
    border: '#EEEEEE',
    surface: '#FAFAFA',
    surfaceForeground: '#0A0A0A',
  },

  spacing: { density: 'spacious', sectionGap: '8rem', componentGap: '3rem', contentWidth: '720px' },
  layout: {
    grid: 'masonry',
    maxWidth: '1400px',
    preferredHero: ['hero-minimal', 'hero-typographic', 'hero-fullscreen'],
    preferredSections: ['gallery-masonry', 'gallery-grid', 'about-minimal', 'contact-minimal'],
    avoidSections: ['pricing-cards', 'testimonial-cards', 'stats-counter', 'faq-accordion'],
  },
  imagery: {
    treatment: 'full-color',
    corners: 'sharp',
    aspectRatios: ['3:2', '4:5', '1:1', '16:9'],
    overlays: false,
    parallax: false,
  },
  navigation: { style: 'minimal', sticky: false, cta: false },
  animation: {
    intensity: 'subtle',
    reveals: true,
    parallax: false,
    microInteractions: true,
    pageTransitions: true,
  },
  buttons: { style: 'underline', corners: '0', uppercase: false, tracking: '0' },
};
