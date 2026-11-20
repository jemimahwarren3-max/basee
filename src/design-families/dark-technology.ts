import type { DesignFamily } from './types';

export const darkTechnology: DesignFamily = {
  id: 'dark-technology',
  name: 'Dark Technology',
  description: 'Sleek dark interfaces with luminous accents, sharp geometry and futuristic feel. For SaaS, software companies, fintech and technology startups.',
  industries: ['saas', 'software', 'fintech', 'ai', 'startup', 'cybersecurity', 'devtools'],
  personality: ['innovative', 'cutting-edge', 'powerful', 'sleek', 'futuristic'],

  typography: {
    heading: '"Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    accent: '"JetBrains Mono", monospace',
    headingWeight: 600,
    bodyWeight: 400,
    headingTracking: '-0.03em',
    bodyLeading: '1.7',
    scale: 'moderate',
  },

  colors: {
    background: '#09090B',
    foreground: '#FAFAFA',
    primary: '#6366F1',
    secondary: '#818CF8',
    accent: '#22D3EE',
    muted: '#18181B',
    mutedForeground: '#A1A1AA',
    border: '#27272A',
    surface: '#111113',
    surfaceForeground: '#FAFAFA',
  },

  spacing: {
    density: 'balanced',
    sectionGap: '8rem',
    componentGap: '3rem',
    contentWidth: '800px',
  },

  layout: {
    grid: 'symmetric',
    maxWidth: '1280px',
    preferredHero: ['hero-gradient', 'hero-centered-dark', 'hero-product'],
    preferredSections: ['features-bento', 'stats-glow', 'pricing-dark'],
    avoidSections: ['gallery-masonry', 'testimonial-quote'],
  },

  imagery: {
    treatment: 'cool',
    corners: 'slight',
    aspectRatios: ['16:9', '4:3', '1:1'],
    overlays: true,
    parallax: false,
  },

  navigation: {
    style: 'solid',
    sticky: true,
    cta: true,
  },

  animation: {
    intensity: 'moderate',
    reveals: true,
    parallax: false,
    microInteractions: true,
    pageTransitions: false,
  },

  buttons: {
    style: 'solid',
    corners: '8px',
    uppercase: false,
    tracking: '0',
  },
};
