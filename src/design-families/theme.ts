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
  const name = stack
    .split(',')[0]
    .trim()
    .replace(/^["']|["']$/g, '');
  return GENERIC.has(name) ? undefined : name;
}

export function googleFontsHref(family: DesignFamily): string {
  const stacks = [
    family.typography.heading,
    family.typography.body,
    family.typography.accent ?? '',
  ];
  const names = new Set<string>();
  for (const stack of stacks) {
    const name = firstFont(stack);
    if (name && !NOT_ON_GOOGLE_FONTS.has(name)) names.add(name);
  }
  const families = [...names].map((n) => `family=${n.replace(/ /g, '+')}:wght@300;400;500;600;700`);
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
}

// Light/dark values. If the family is already dark (bg is darker than fg),
// the "dark" block becomes a no-op so colours don't invert twice.
function isDark(hex: string): boolean {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return 0.299 * r + 0.587 * g + 0.114 * b < 128;
}

export function themeCss(family: DesignFamily): string {
  const c = family.colors;
  const t = family.typography;

  const familyIsDark = isDark(c.background);
  // Default dark palette: swap bg/fg and darken supporting surfaces.
  const dark = familyIsDark
    ? c // already dark — keep the family's own values
    : {
        background: '#0b0b0d',
        foreground: '#f4f4f5',
        muted: '#18181b',
        mutedForeground: '#a1a1aa',
        border: '#27272a',
        surface: '#111113',
        surfaceForeground: '#f4f4f5',
      };

  return `:root {
  color-scheme: light dark;
  --color-bg: ${c.background};
  --color-fg: ${c.foreground};
  --color-dark-bg: ${familyIsDark ? c.background : c.foreground};
  --color-dark-fg: ${familyIsDark ? c.foreground : c.background};
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
}
[data-theme="dark"] {
  --color-bg: ${dark.background};
  --color-fg: ${dark.foreground};
  --color-muted: ${dark.muted};
  --color-muted-fg: ${dark.mutedForeground};
  --color-border: ${dark.border};
  --color-surface: ${dark.surface};
  --color-surface-fg: ${dark.surfaceForeground};
}`;
}
