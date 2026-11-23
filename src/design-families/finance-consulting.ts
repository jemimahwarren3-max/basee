import type { DesignFamily } from './types';

export const financeConsulting: DesignFamily = {
  id: 'finance-consulting',
  name: 'Finance & Consulting',
  description:
    'Conservative authority with modern polish. For financial advisors, investment firms, insurance, accounting and management consulting.',
  industries: [
    'finance',
    'investment',
    'insurance',
    'accounting',
    'consulting',
    'wealth-management',
  ],
  personality: ['authoritative', 'trustworthy', 'sophisticated', 'stable', 'professional'],

  typography: {
    heading: '"Lora", Georgia, serif',
    body: '"Inter", system-ui, sans-serif',
    headingWeight: 600,
    bodyWeight: 400,
    headingTracking: '-0.01em',
    bodyLeading: '1.7',
    scale: 'moderate',
  },

  colors: {
    background: '#FFFFFF',
    foreground: '#0F172A',
    primary: '#0F172A',
    secondary: '#1E40AF',
    accent: '#1E40AF',
    muted: '#F1F5F9',
    mutedForeground: '#475569',
    border: '#CBD5E1',
    surface: '#F8FAFC',
    surfaceForeground: '#0F172A',
  },

  spacing: {
    density: 'balanced',
    sectionGap: '6rem',
    componentGap: '2.5rem',
    contentWidth: '800px',
  },
  layout: {
    grid: 'symmetric',
    maxWidth: '1200px',
    preferredHero: ['hero-split-clean', 'hero-text-centered', 'hero-minimal'],
    preferredSections: [
      'services-grid',
      'stats-counter',
      'testimonial-cards',
      'about-team',
      'contact-form',
    ],
    avoidSections: ['gallery-masonry', 'hero-cinematic', 'gallery-lookbook'],
  },
  imagery: {
    treatment: 'muted',
    corners: 'slight',
    aspectRatios: ['16:9', '4:3', '1:1'],
    overlays: false,
    parallax: false,
  },
  navigation: { style: 'solid', sticky: true, cta: true },
  animation: {
    intensity: 'subtle',
    reveals: true,
    parallax: false,
    microInteractions: false,
    pageTransitions: false,
  },
  buttons: { style: 'solid', corners: '6px', uppercase: false, tracking: '0' },
};
