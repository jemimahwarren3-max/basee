import type { DesignFamily } from './types';

const NOT_ON_GOOGLE_FONTS = new Set(['Helvetica Neue']);
const GENERIC = new Set(['serif', 'sans-serif', 'monospace', 'cursive', 'system-ui']);

const RADIUS: Record<DesignFamily['imagery']['corners'], string> = {
  sharp: '0',
  slight: '0.25rem',
  rounded: '1rem',
  pill: '9999px',
};

function firstFont(stack: string): string | undefined {
  if (stack.startsWith('#')) return undefined;
  const name = stack.split(',')[0].trim().replace(/^["']|["']$/g, '');
  return GENERIC.has(name) ? undefined : name;
}

export function googleFontsHref(family: DesignFamily): string {
  const stacks = [family.typography.heading, family.typography.body, family.typography.accent ?? ''];
  const names = new Set<string>();
  for (const stack of stacks) {
    const name = firstFont(stack);
    if (name && !NOT_ON_GOOGLE_FONTS.has(name)) names.add(name);
  }
  const families = [...names].map((n) => `family=${n.replace(/ /g, '+')}:wght@300;400;500;600;700`);
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
}

export function themeCss(family: DesignFamily): string {
  const c = family.colors;
  const t = family.typography;
  return `:root {
  --color-bg: ${c.background};
  --color-fg: ${c.foreground};
  --color-primary: ${c.primary};
  --color-secondary: ${c.secondary};
  --color-accent: ${c.accent};
  --color-muted: ${c.muted};
  --color-muted-fg: ${c.mutedForeground};
  --color-border: ${c.border};
  --color-surface: ${c.surface};
  --color-surface-fg: ${c.surfaceForeground};
  --font-heading: ${t.heading};
  --font-body: ${t.body};
  --font-accent: ${t.accent ?? t.body};
  --heading-weight: ${t.headingWeight};
  --body-weight: ${t.bodyWeight};
  --heading-tracking: ${t.headingTracking};
  --body-leading: ${t.bodyLeading};
  --radius-image: ${RADIUS[family.imagery.corners]};
  --radius-button: ${family.buttons.corners};
  --section-gap: ${family.spacing.sectionGap};
  --component-gap: ${family.spacing.componentGap};
  --content-width: ${family.spacing.contentWidth};
}`;
}
