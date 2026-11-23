import type { DesignFamily } from './types';

export const modernEcommerce: DesignFamily = {
  id: 'modern-ecommerce',
  name: 'Modern Ecommerce',
  description:
    'Conversion-optimised with clean product presentation, strong CTAs and efficient layouts. For online shops, DTC brands, marketplaces and subscription services.',
  industries: ['ecommerce', 'dtc', 'marketplace', 'subscription', 'retail', 'electronics'],
  personality: ['efficient', 'trustworthy', 'modern', 'conversion-focused', 'clean'],

  typography: {
    heading: '"Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    headingWeight: 600,
    bodyWeight: 400,
    headingTracking: '-0.02em',
    bodyLeading: '1.65',
    scale: 'compact',
  },

  colors: {
    background: '#FFFFFF',
    foreground: '#111827',
    primary: '#111827',
    secondary: '#6B7280',
    accent: '#4F46E5',
    muted: '#F9FAFB',
    mutedForeground: '#6B7280',
    border: '#E5E7EB',
    surface: '#F3F4F6',
    surfaceForeground: '#111827',
  },

  spacing: { density: 'tight', sectionGap: '5rem', componentGap: '2rem', contentWidth: '1060px' },
  layout: {
    grid: 'symmetric',
    maxWidth: '1360px',
    preferredHero: ['hero-product', 'hero-split-clean', 'hero-centered-image'],
    preferredSections: [
      'products-grid',
      'testimonial-cards',
      'features-icons',
      'cta-simple',
      'faq-accordion',
    ],
    avoidSections: ['gallery-masonry', 'hero-cinematic', 'about-editorial'],
  },
  imagery: {
    treatment: 'full-color',
    corners: 'rounded',
    aspectRatios: ['1:1', '4:5', '3:4'],
    overlays: false,
    parallax: false,
  },
  navigation: { style: 'solid', sticky: true, cta: true },
  animation: {
    intensity: 'subtle',
    reveals: true,
    parallax: false,
    microInteractions: true,
    pageTransitions: false,
  },
  buttons: { style: 'solid', corners: '8px', uppercase: false, tracking: '0' },
};
