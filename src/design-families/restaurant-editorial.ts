import type { DesignFamily } from './types';

export const restaurantEditorial: DesignFamily = {
  id: 'restaurant-editorial',
  name: 'Restaurant Editorial',
  description: 'Warm, appetite-driven design with editorial food photography and intimate typography. For restaurants, cafes, bars, bakeries and food brands.',
  industries: ['restaurant', 'cafe', 'bar', 'bakery', 'food-brand', 'catering', 'wine-bar'],
  personality: ['appetising', 'intimate', 'artisanal', 'warm', 'inviting'],

  typography: {
    heading: '"Fraunces", Georgia, serif',
    body: '"DM Sans", system-ui, sans-serif',
    accent: '"Caveat", cursive',
    headingWeight: 500,
    bodyWeight: 400,
    headingTracking: '-0.01em',
    bodyLeading: '1.7',
    scale: 'moderate',
  },

  colors: {
    background: '#FBF8F3',
    foreground: '#2B2017',
    primary: '#6B3A2A',
    secondary: '#A67B5B',
    accent: '#8B4513',
    muted: '#F2EDE5',
    mutedForeground: '#7A6B5D',
    border: '#E0D6C8',
    surface: '#FFFFFF',
    surfaceForeground: '#2B2017',
  },

  spacing: { density: 'balanced', sectionGap: '7rem', componentGap: '3rem', contentWidth: '760px' },
  layout: {
    grid: 'editorial',
    maxWidth: '1300px',
    preferredHero: ['hero-fullscreen-image', 'hero-split', 'hero-editorial'],
    preferredSections: ['gallery-editorial', 'about-story', 'contact-simple', 'cta-image'],
    avoidSections: ['pricing-cards', 'features-bento', 'stats-counter'],
  },
  imagery: { treatment: 'warm', corners: 'sharp', aspectRatios: ['1:1', '4:5', '3:2'], overlays: true, parallax: false },
  navigation: { style: 'centered', sticky: true, cta: true },
  animation: { intensity: 'subtle', reveals: true, parallax: false, microInteractions: true, pageTransitions: false },
  buttons: { style: 'solid', corners: '9999px', uppercase: false, tracking: '0' },
};
