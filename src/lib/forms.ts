// Small helpers for wiring forms to a provider (Formspree, Web3Forms, Netlify, a custom endpoint).
// The form components take an `action` prop; use these helpers to derive it from site.config.
import { site } from '../site.config';

export function enquiryAction(): string {
  return site.forms.enquiry || '#';
}

export function bookingAction(): string {
  return site.forms.booking || '#';
}

export function isConfigured(action: string): boolean {
  return action !== '#' && action !== '' && !action.startsWith('mailto:');
}
