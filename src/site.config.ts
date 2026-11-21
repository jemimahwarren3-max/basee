// Everything that changes per client lives here. Bracketed values are placeholders
// the client must replace before launch.
export const site = {
  name: 'Serenité',
  family: 'beauty-cosmetics',
  title: 'Serenité Spa — Luxury Wellness & Beauty',
  description: 'Escape into tranquility. Bespoke spa treatments, therapeutic massage, and holistic wellness.',
  announcement: { text: 'New guest offer: [offer details]', href: '#booking' },
  nav: [
    { label: 'Treatments', href: '#treatments' },
    { label: 'Experience', href: '#experience' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ],
  contact: {
    whatsapp: '[WhatsApp number]',
    email: '[Email]',
    phone: '[Phone]',
    address: '[Address]',
    hours: '[Opening hours]',
  },
  social: [
    { platform: 'Instagram', url: '[Instagram URL]' },
    { platform: 'Facebook', url: '[Facebook URL]' },
  ],
  copyright: `© ${new Date().getFullYear()} Serenité. All rights reserved.`,
};
