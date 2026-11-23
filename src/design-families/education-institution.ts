import type { DesignFamily } from './types';

export const educationInstitution: DesignFamily = {
  id: 'education-institution',
  name: 'Education & Institutions',
  description:
    'Structured, approachable and information-dense. For schools, universities, training providers, online courses and educational institutions.',
  industries: ['education', 'university', 'school', 'training', 'online-courses', 'academy'],
  personality: ['approachable', 'knowledgeable', 'structured', 'inclusive', 'progressive'],

  typography: {
    heading: '"Source Sans 3", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    headingWeight: 700,
    bodyWeight: 400,
    headingTracking: '-0.01em',
    bodyLeading: '1.7',
    scale: 'compact',
  },

  colors: {
    background: '#FFFFFF',
    foreground: '#1E1E2E',
    primary: '#1E3A5F',
    secondary: '#3B82F6',
    accent: '#F59E0B',
    muted: '#F5F7FA',
    mutedForeground: '#64748B',
    border: '#E2E8F0',
    surface: '#F8FAFC',
    surfaceForeground: '#1E1E2E',
  },

  spacing: { density: 'balanced', sectionGap: '5rem', componentGap: '2rem', contentWidth: '860px' },
  layout: {
    grid: 'symmetric',
    maxWidth: '1200px',
    preferredHero: ['hero-text-centered', 'hero-split-clean', 'hero-centered-image'],
    preferredSections: [
      'services-cards',
      'stats-counter',
      'testimonial-cards',
      'faq-accordion',
      'cta-simple',
    ],
    avoidSections: ['gallery-masonry', 'hero-cinematic'],
  },
  imagery: {
    treatment: 'full-color',
    corners: 'rounded',
    aspectRatios: ['16:9', '4:3', '1:1'],
    overlays: false,
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
  buttons: { style: 'solid', corners: '8px', uppercase: false, tracking: '0' },
};
