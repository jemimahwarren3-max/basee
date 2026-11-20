import type { DesignFamily } from './types';

export const warmHospitality: DesignFamily = {
  id: 'warm-hospitality',
  name: 'Warm Hospitality',
  description: 'Inviting warmth with earthy tones, generous photography and organic textures. For restaurants, resorts, lodges, tourism and boutique hospitality.',
  industries: ['hospitality', 'restaurant', 'resort', 'lodge', 'tourism', 'safari', 'boutique-hotel', 'spa'],
  personality: ['warm', 'inviting', 'authentic', 'experiential', 'relaxed'],

  typography: {
    heading: '"DM Serif Display", Georgia, serif',
    body: '"DM Sans", system-ui, sans-serif',
    accent: '"Cormorant", Georgia, serif',
    headingWeight: 400,
    bodyWeight: 400,
    headingTracking: '-0.01em',
    bodyLeading: '1.75',
    scale: 'dramatic',
  },

  colors: {
    background: '#FAF7F2',
    foreground: '#2C2418',
    primary: '#8B6B47',
    secondary: '#C4A97D',
    accent: '#B85C38',
    muted: '#F0EBE3',
    mutedForeground: '#7A6E5D',
    border: '#DDD5C8',
    surface: '#FFFFFF',
    surfaceForeground: '#2C2418',
  },

  spacing: {
    density: 'editorial',
    sectionGap: '9rem',
    componentGap: '4rem',
    contentWidth: '760px',
  },

  layout: {
    grid: 'editorial',
    maxWidth: '1440px',
    preferredHero: ['hero-cinematic', 'hero-parallax', 'hero-fullscreen-image'],
    preferredSections: ['gallery-editorial', 'about-story', 'testimonial-quote', 'cta-image'],
    avoidSections: ['pricing-cards', 'features-bento', 'stats-counter'],
  },

  imagery: {
    treatment: 'warm',
    corners: 'sharp',
    aspectRatios: ['16:9', '3:2', '4:5'],
    overlays: true,
    parallax: true,
  },

  navigation: {
    style: 'transparent',
    sticky: true,
    cta: true,
  },

  animation: {
    intensity: 'subtle',
    reveals: true,
    parallax: true,
    microInteractions: true,
    pageTransitions: false,
  },

  buttons: {
    style: 'outline',
    corners: '0',
    uppercase: true,
    tracking: '0.12em',
  },
};
