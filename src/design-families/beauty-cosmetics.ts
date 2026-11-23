import type { DesignFamily } from './types';

export const beautyCosmetics: DesignFamily = {
  id: 'beauty-cosmetics',
  name: 'Beauty & Cosmetics',
  description:
    'Soft, luxurious and sensorial with blush tones and refined imagery. For beauty brands, skincare, cosmetics, hair salons and personal care.',
  industries: [
    'beauty',
    'skincare',
    'cosmetics',
    'hair-salon',
    'personal-care',
    'perfume',
    'nails',
  ],
  personality: ['luxurious', 'sensorial', 'feminine', 'soft', 'aspirational'],

  typography: {
    heading: '"Cormorant Garamond", Georgia, serif',
    body: '"Nunito Sans", system-ui, sans-serif',
    headingWeight: 500,
    bodyWeight: 400,
    headingTracking: '0',
    bodyLeading: '1.7',
    scale: 'moderate',
  },

  colors: {
    background: '#FDF9F7',
    foreground: '#2D2026',
    primary: '#C1A08A',
    secondary: '#E8D5C4',
    accent: '#B76E79',
    muted: '#F7F0EB',
    mutedForeground: '#8B7B72',
    border: '#EBE0D8',
    surface: '#FFFFFF',
    surfaceForeground: '#2D2026',
  },

  spacing: { density: 'spacious', sectionGap: '8rem', componentGap: '3rem', contentWidth: '780px' },
  layout: {
    grid: 'editorial',
    maxWidth: '1360px',
    preferredHero: ['hero-split', 'hero-editorial', 'hero-centered-image'],
    preferredSections: [
      'products-editorial',
      'testimonial-quote',
      'about-brand',
      'gallery-lookbook',
    ],
    avoidSections: ['stats-counter', 'features-bento', 'pricing-dark'],
  },
  imagery: {
    treatment: 'warm',
    corners: 'rounded',
    aspectRatios: ['4:5', '1:1', '3:4'],
    overlays: false,
    parallax: false,
  },
  navigation: { style: 'centered', sticky: true, cta: true },
  animation: {
    intensity: 'subtle',
    reveals: true,
    parallax: false,
    microInteractions: true,
    pageTransitions: false,
  },
  buttons: { style: 'pill', corners: '9999px', uppercase: true, tracking: '0.1em' },
};
