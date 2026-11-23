// Fill this file in for each new site. Every page reads from `site`.
// Leave a field as '' if it doesn't apply.
export const site = {
  // The brand name shown in the nav and footer.
  name: '',

  // Optional brand assets. If set, <Brand> renders these instead of the name.
  // logoImage: path to an image in /public (e.g. '/brand/logo.svg').
  // logoSvg: inline SVG markup. Takes precedence over logoImage when both are set.
  logoImage: '',
  logoSvg: '',

  // One of the ids in src/design-families/. Drives the colours, fonts and corners.
  family: 'swiss-minimalism',

  // The browser tab title and the meta description.
  title: '',
  description: '',

  // Shown as a thin bar above the nav. Leave text empty to hide it.
  announcement: { text: '', href: '' },

  // Top-level navigation. hrefs can be in-page anchors or routes.
  nav: [] as { label: string; href: string }[],

  // Shown in the nav and in CTAs. Leave undefined to hide the nav button.
  primaryCta: undefined as { label: string; href: string } | undefined,

  // Contact details. Used by contact, booking and footer components.
  contact: {
    whatsapp: '', // digits only, no + or spaces
    email: '',
    phone: '',
    address: '',
    hours: '',
  },

  // Social links shown in footers. Omit any that don't apply.
  social: [] as { platform: string; url: string }[],

  // Where forms post to. Change per client; see src/components/contact for shape.
  forms: {
    enquiry: '', // e.g. a Formspree or Web3Forms endpoint
    booking: '', // e.g. a Cal.com booking link or your own endpoint
  },

  // Snipcart commerce. Leave snipcartApiKey empty to disable all commerce
  // components. Default (sandbox) API key only works on localhost.
  commerce: {
    snipcartApiKey: '', // Snipcart dashboard → API Keys → Public key
    currency: 'USD',
  },

  // Footer copyright. {year} is replaced at build.
  copyright: '© {year} {name}. All rights reserved.',
};

export function copyright(): string {
  return site.copyright
    .replace('{year}', String(new Date().getFullYear()))
    .replace('{name}', site.name);
}
