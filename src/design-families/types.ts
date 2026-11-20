export interface DesignFamily {
  id: string;
  name: string;
  description: string;
  industries: string[];
  personality: string[];

  typography: {
    heading: string;
    body: string;
    accent?: string;
    headingWeight: number;
    bodyWeight: number;
    headingTracking: string;
    bodyLeading: string;
    scale: 'compact' | 'moderate' | 'dramatic';
  };

  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    mutedForeground: string;
    border: string;
    surface: string;
    surfaceForeground: string;
  };

  spacing: {
    density: 'tight' | 'balanced' | 'spacious' | 'editorial';
    sectionGap: string;
    componentGap: string;
    contentWidth: string;
  };

  layout: {
    grid: 'symmetric' | 'asymmetric' | 'editorial' | 'masonry' | 'fullbleed';
    maxWidth: string;
    preferredHero: string[];
    preferredSections: string[];
    avoidSections: string[];
  };

  imagery: {
    treatment: 'full-color' | 'muted' | 'duotone' | 'high-contrast' | 'warm' | 'cool';
    corners: 'sharp' | 'slight' | 'rounded' | 'pill';
    aspectRatios: string[];
    overlays: boolean;
    parallax: boolean;
  };

  navigation: {
    style: 'minimal' | 'centered' | 'sidebar' | 'overlay' | 'transparent' | 'solid';
    sticky: boolean;
    cta: boolean;
  };

  animation: {
    intensity: 'none' | 'subtle' | 'moderate' | 'expressive';
    reveals: boolean;
    parallax: boolean;
    microInteractions: boolean;
    pageTransitions: boolean;
  };

  buttons: {
    style: 'minimal' | 'solid' | 'outline' | 'pill' | 'underline' | 'ghost';
    corners: string;
    uppercase: boolean;
    tracking: string;
  };
}

export interface ComponentMeta {
  id: string;
  name: string;
  category: string;
  description: string;
  families: string[];
  industries: string[];
  layout: string;
  hasAnimation: boolean;
  props: Record<string, string>;
}
