import type { DesignFamily } from './types';

export const corporateInstitutional: DesignFamily = {
  id: 'corporate-institutional',
  name: 'Corporate Institutional',
  description: 'Authoritative, structured and information-rich. For corporations, NGOs, government bodies, universities and large organisations.',
  industries: ['corporate', 'ngo', 'government', 'university', 'institution', 'foundation'],
  personality: ['authoritative', 'structured', 'reliable', 'informative', 'established'],

  typography: {
    heading: '"Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    headingWeight: 700,
    bodyWeight: 400,
    headingTracking: '-0.02em',
    bodyLeading: '1.7',
    scale: 'compact',
  },

  colors: {
    background: '#FFFFFF',
    foreground: '#1A1A2E',
    primary: '#16213E',
    secondary: '#0F3460',
    accent: '#E94560',
    muted: '#F4F4F8',
    mutedForeground: '#5A5A7A',
    border: '#E0E0EA',
    surface: '#F8F8FC',
    surfaceForeground: '#1A1A2E',
  },

  spacing: { density: 'balanced', sectionGap: '6rem', componentGap: '2.5rem', contentWidth: '860px' },
  layout: {
    grid: 'symmetric',
    maxWidth: '1200px',
    preferredHero: ['hero-text-centered', 'hero-split-clean', 'hero-minimal'],
    preferredSections: ['services-grid', 'stats-counter', 'about-columns', 'faq-accordion', 'contact-form'],
    avoidSections: ['hero-cinematic', 'gallery-masonry'],
  },
  imagery: { treatment: 'full-color', corners: 'slight', aspectRatios: ['16:9', '4:3', '1:1'], overlays: false, parallax: false },
  navigation: { style: 'solid', sticky: true, cta: true },
  animation: { intensity: 'subtle', reveals: true, parallax: false, microInteractions: false, pageTransitions: false },
  buttons: { style: 'solid', corners: '6px', uppercase: false, tracking: '0' },
};
