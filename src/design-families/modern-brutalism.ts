import type { DesignFamily } from './types';

export const modernBrutalism: DesignFamily = {
  id: 'modern-brutalism',
  name: 'Modern Brutalism',
  description: 'Bold, raw aesthetics with oversized typography, hard edges and unapologetic contrast. For creative studios, agencies, portfolios and experimental brands.',
  industries: ['creative-agency', 'design-studio', 'portfolio', 'music', 'art', 'experimental'],
  personality: ['bold', 'raw', 'confident', 'rebellious', 'expressive'],

  typography: {
    heading: '"Space Grotesk", "Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    accent: '"Space Mono", monospace',
    headingWeight: 700,
    bodyWeight: 400,
    headingTracking: '-0.04em',
    bodyLeading: '1.6',
    scale: 'dramatic',
  },

  colors: {
    background: '#F5F5F0',
    foreground: '#0A0A0A',
    primary: '#0A0A0A',
    secondary: '#FF4D00',
    accent: '#FF4D00',
    muted: '#EBEBEB',
    mutedForeground: '#555555',
    border: '#0A0A0A',
    surface: '#FFFFFF',
    surfaceForeground: '#0A0A0A',
  },

  spacing: {
    density: 'spacious',
    sectionGap: '8rem',
    componentGap: '3rem',
    contentWidth: '960px',
  },

  layout: {
    grid: 'asymmetric',
    maxWidth: '1600px',
    preferredHero: ['hero-typographic', 'hero-asymmetric', 'hero-fullscreen'],
    preferredSections: ['about-bold', 'services-list', 'gallery-grid-irregular'],
    avoidSections: ['testimonial-cards', 'pricing-cards'],
  },

  imagery: {
    treatment: 'high-contrast',
    corners: 'sharp',
    aspectRatios: ['16:9', '1:1', '9:16'],
    overlays: false,
    parallax: true,
  },

  navigation: {
    style: 'minimal',
    sticky: false,
    cta: false,
  },

  animation: {
    intensity: 'expressive',
    reveals: true,
    parallax: true,
    microInteractions: true,
    pageTransitions: true,
  },

  buttons: {
    style: 'solid',
    corners: '0',
    uppercase: true,
    tracking: '0.1em',
  },
};
