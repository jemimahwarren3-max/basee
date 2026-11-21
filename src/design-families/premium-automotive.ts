import type { DesignFamily } from './types';

export const premiumAutomotive: DesignFamily = {
  id: 'premium-automotive',
  name: 'Premium Automotive',
  description: 'Dark, cinematic and performance-driven with dynamic compositions. For car dealerships, automotive brands, motorsport and luxury vehicles.',
  industries: ['automotive', 'car-dealer', 'motorsport', 'luxury-vehicle', 'motorcycle'],
  personality: ['powerful', 'dynamic', 'premium', 'performance', 'precision'],

  typography: {
    heading: '"Barlow", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    headingWeight: 700,
    bodyWeight: 400,
    headingTracking: '-0.02em',
    bodyLeading: '1.65',
    scale: 'dramatic',
  },

  colors: {
    background: '#0C0C0E',
    foreground: '#F5F5F5',
    primary: '#E8E8E8',
    secondary: '#888888',
    accent: '#DC2626',
    muted: '#1A1A1E',
    mutedForeground: '#999999',
    border: '#2A2A2E',
    surface: '#141416',
    surfaceForeground: '#F5F5F5',
  },

  spacing: { density: 'spacious', sectionGap: '8rem', componentGap: '3rem', contentWidth: '800px' },
  layout: {
    grid: 'fullbleed',
    maxWidth: '1600px',
    preferredHero: ['hero-cinematic', 'hero-fullscreen', 'hero-parallax'],
    preferredSections: ['gallery-fullwidth', 'stats-counter', 'about-bold', 'cta-dark'],
    avoidSections: ['faq-accordion', 'pricing-cards', 'testimonial-cards'],
  },
  imagery: { treatment: 'high-contrast', corners: 'sharp', aspectRatios: ['21:9', '16:9', '3:2'], overlays: true, parallax: true },
  navigation: { style: 'transparent', sticky: true, cta: true },
  animation: { intensity: 'expressive', reveals: true, parallax: true, microInteractions: true, pageTransitions: true },
  buttons: { style: 'solid', corners: '0', uppercase: true, tracking: '0.12em' },
};
