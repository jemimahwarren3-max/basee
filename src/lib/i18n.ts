// Tiny i18n helper. Each page or component calls `t(locale)` to get a
// translation function bound to that locale. The dictionary type comes from
// src/i18n/en.ts so missing keys are a type error.
//
// To enable URL-prefixed routing (/en/…, /fr/…), add Astro's built-in i18n
// to astro.config.mjs:
//
//   i18n: { defaultLocale: 'en', locales: ['en', 'fr'] }
//
// Without that config this helper still works — pages that want translations
// import t() and pass the locale explicitly. Routes stay single-locale.
import en, { type Dictionary } from '../i18n/en';
import fr from '../i18n/fr';

export const DICTIONARIES: Record<string, Dictionary> = { en, fr };

export type Locale = keyof typeof DICTIONARIES;

export function t(locale: string = 'en'): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES.en;
}

/** Pull the first path segment as the locale, if it matches a known one. */
export function localeFromUrl(url: URL): Locale {
  const seg = url.pathname.split('/').filter(Boolean)[0];
  return seg && seg in DICTIONARIES ? (seg as Locale) : 'en';
}
