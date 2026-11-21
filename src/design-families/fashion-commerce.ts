import type { DesignFamily } from './types';

export const fashionCommerce: DesignFamily = {
  id: 'fashion-commerce',
  name: 'Fashion Commerce',
  description: 'High-fashion editorial meets clean ecommerce. For clothing, jewellery, lifestyle brands, luxury retail and beauty products.',
  industries: ['fashion', 'jewellery', 'lifestyle', 'luxury-retail', 'beauty', 'accessories'],
  personality: ['aspirational', 'curated', 'editorial', 'modern', 'desirable'],

  typography: {
    heading: '"Libre Baskerville", Georgia, serif',
    body: '"Archivo", system-ui, sans-serif',
    headingWeight: 400,
    bodyWeight: 400,
    headingTracking: '0',
    bodyLeading: '1.65',
    scale: 'moderate',
  },

  colors: {
    background: '#FFFFFF',
    foreground: '#1A1A1A',
    primary: '#1A1A1A',
    secondary: '#8C8C8C',
    accent: '#B8956A',
    muted: '#F8F8F6',
    mutedForeground: '#6E6E6E',
    border: '#E8E8E8',
    surface: '#F5F5F3',
    surfaceForeground: '#1A1A1A',
  },

  spacing: {
    density: 'spacious',
    sectionGap: '8rem',
    componentGap: '3rem',
    contentWidth: '780px',
  },

  layout: {
    grid: 'editorial',
    maxWidth: '1400px',
    preferredHero: ['hero-split', 'hero-editorial', 'hero-fullscreen'],
    preferredSections: ['products-editorial', 'gallery-lookbook', 'about-brand'],
    avoidSections: ['stats-counter', 'pricing-cards', 'faq-accordion'],
  },

  imagery: {
    treatment: 'full-color',
    corners: 'sharp',
    aspectRatios: ['2:3', '3:4', '1:1'],
    overlays: false,
    parallax: false,
  },

  navigation: {
    style: 'minimal',
    sticky: true,
    cta: false,
  },

  animation: {
    intensity: 'subtle',
    reveals: true,
    parallax: false,
    microInteractions: true,
    pageTransitions: false,
  },

  buttons: {
    style: 'underline',
    corners: '0',
    uppercase: true,
    tracking: '0.15em',
  },
};
