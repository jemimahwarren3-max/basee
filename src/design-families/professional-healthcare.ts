import type { DesignFamily } from './types';

export const professionalHealthcare: DesignFamily = {
  id: 'professional-healthcare',
  name: 'Professional Healthcare',
  description: 'Clean, calming and trustworthy with soft tones and clear navigation. For clinics, dental practices, wellness centres and medical professionals.',
  industries: ['healthcare', 'dental', 'wellness', 'medical', 'therapy', 'physiotherapy', 'optometry'],
  personality: ['trustworthy', 'calming', 'professional', 'caring', 'clean'],

  typography: {
    heading: '"Plus Jakarta Sans", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    headingWeight: 600,
    bodyWeight: 400,
    headingTracking: '-0.01em',
    bodyLeading: '1.7',
    scale: 'moderate',
  },

  colors: {
    background: '#FFFFFF',
    foreground: '#1E293B',
    primary: '#0D9488',
    secondary: '#5EEAD4',
    accent: '#0D9488',
    muted: '#F0FDFA',
    mutedForeground: '#64748B',
    border: '#E2E8F0',
    surface: '#F8FAFC',
    surfaceForeground: '#1E293B',
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
    preferredHero: ['hero-split-clean', 'hero-centered-image', 'hero-text-centered'],
    preferredSections: ['services-cards', 'testimonial-cards', 'about-team', 'contact-form', 'faq-accordion'],
    avoidSections: ['gallery-masonry', 'hero-cinematic'],
  },

  imagery: { treatment: 'full-color', corners: 'rounded', aspectRatios: ['16:9', '4:3', '1:1'], overlays: false, parallax: false },
  navigation: { style: 'solid', sticky: true, cta: true },
  animation: { intensity: 'subtle', reveals: true, parallax: false, microInteractions: true, pageTransitions: false },
  buttons: { style: 'solid', corners: '9999px', uppercase: false, tracking: '0' },
};
