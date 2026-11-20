import type { DesignFamily } from './types';

export const creativePhotography: DesignFamily = {
  id: 'creative-photography',
  name: 'Creative Photography',
  description: 'Image-first layouts with cinematic grids, dramatic scale and minimal UI. For photography studios, galleries, visual artists and media producers.',
  industries: ['photography', 'gallery', 'visual-arts', 'media-production', 'videography'],
  personality: ['visual', 'dramatic', 'immersive', 'artistic', 'cinematic'],

  typography: {
    heading: '"Instrument Serif", Georgia, serif',
    body: '"DM Sans", system-ui, sans-serif',
    headingWeight: 400,
    bodyWeight: 400,
    headingTracking: '-0.01em',
    bodyLeading: '1.7',
    scale: 'dramatic',
  },

  colors: {
    background: '#0F0F0F',
    foreground: '#E8E8E8',
    primary: '#E8E8E8',
    secondary: '#888888',
    accent: '#E8E8E8',
    muted: '#1A1A1A',
    mutedForeground: '#999999',
    border: '#2A2A2A',
    surface: '#161616',
    surfaceForeground: '#E8E8E8',
  },

  spacing: { density: 'editorial', sectionGap: '6rem', componentGap: '2rem', contentWidth: '720px' },
  layout: {
    grid: 'masonry',
    maxWidth: '1600px',
    preferredHero: ['hero-fullscreen-image', 'hero-cinematic', 'hero-parallax'],
    preferredSections: ['gallery-masonry', 'gallery-fullwidth', 'about-minimal'],
    avoidSections: ['pricing-cards', 'services-grid', 'stats-counter', 'faq-accordion'],
  },
  imagery: { treatment: 'full-color', corners: 'sharp', aspectRatios: ['3:2', '2:3', '16:9', '1:1'], overlays: true, parallax: true },
  navigation: { style: 'overlay', sticky: false, cta: false },
  animation: { intensity: 'moderate', reveals: true, parallax: true, microInteractions: true, pageTransitions: true },
  buttons: { style: 'ghost', corners: '0', uppercase: true, tracking: '0.15em' },
};
