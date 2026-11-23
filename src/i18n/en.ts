// English dictionary. One key per phrase. Keys are code identifiers, values
// are the text seen in the UI. Translate this file and add others next to it
// (fr.ts, es.ts, de.ts…) to support more languages.
export default {
  nav: {
    skipToMain: 'Skip to main content',
    menu: 'Menu',
    close: 'Close',
  },
  cta: {
    bookNow: 'Book now',
    learnMore: 'Learn more',
    getInTouch: 'Get in touch',
  },
  form: {
    name: 'Full name',
    email: 'Email',
    phone: 'Phone',
    message: 'Message',
    subject: 'Subject',
    submit: 'Send',
    thanks: 'Thank you — your message is on its way.',
    error: 'Something went wrong. Please try again.',
  },
  footer: {
    rightsReserved: 'All rights reserved.',
  },
  search: {
    title: 'Search',
    placeholder: 'Search…',
  },
  pageNotFound: {
    title: 'Page not found',
    subtitle: "The page you were looking for doesn't exist or has moved.",
    back: 'Back to home',
  },
};

export type Dictionary = typeof import('./en').default;
