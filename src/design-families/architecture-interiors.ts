import type { DesignFamily } from './types';

export const architectureInteriors: DesignFamily = {
  id: 'architecture-interiors',
  name: 'Architecture & Interiors',
  description:
    'Structural precision, generous whitespace and architectural grids. For architecture firms, interior designers, construction and built-environment professionals.',
  industries: ['architecture', 'interior-design', 'construction', 'landscape', 'urban-planning'],
  personality: ['precise', 'spatial', 'refined', 'structural', 'considered'],

  typography: {
    heading: '"Instrument Sans", "Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    headingWeight: 500,
    bodyWeight: 400,
    headingTracking: '-0.01em',
    bodyLeading: '1.7',
    scale: 'moderate',
  },

  colors: {
    background: '#FAFAFA',
    foreground: '#1A1A1A',
    primary: '#333333',
    secondary: '#888888',
    accent: '#1A1A1A',
    muted: '#F0F0F0',
    mutedForeground: '#666666',
    border: '#E0E0E0',
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
    grid: 'asymmetric',
    maxWidth: '1440px',
    preferredHero: ['hero-fullscreen', 'hero-split', 'hero-minimal'],
    preferredSections: ['gallery-grid', 'about-editorial', 'services-list'],
    avoidSections: ['testimonial-cards', 'pricing-cards', 'stats-counter'],
  },
  imagery: {
    treatment: 'full-color',
    corners: 'sharp',
    aspectRatios: ['16:9', '3:2', '4:5', '1:1'],
    overlays: false,
    parallax: true,
  },
  navigation: { style: 'minimal', sticky: true, cta: false },
  animation: {
    intensity: 'subtle',
    reveals: true,
    parallax: true,
    microInteractions: true,
    pageTransitions: false,
  },
  buttons: { style: 'outline', corners: '0', uppercase: true, tracking: '0.12em' },
};
