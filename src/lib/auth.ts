// Real admin auth for Astro server mode.
//
// This file ships ready to use, but Astro's middleware only runs when the
// site is built in server mode. To activate:
//
//   1. Install an adapter:   npm install @astrojs/node
//   2. In astro.config.mjs:  output: 'server', adapter: node({ mode: 'standalone' })
//   3. Set env in .env.local:
//        ADMIN_PASSWORD_HASH=<from npm run hash-password -- 'password'>
//        ADMIN_SESSION_SECRET=<a long random string, e.g. openssl rand -hex 32>
//   4. Visit /admin/login to sign in.
//
// In static mode (the default) this code never runs; the client-side
// AuthGate deterrent is the only protection.

import { createHmac, timingSafeEqual, createHash } from 'node:crypto';

const COOKIE = 'admin_session';
const MAX_AGE = 60 * 60 * 8; // 8 hours

function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET must be set and at least 32 chars');
  }
  return s;
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('hex');
}

export function sha256Hex(text: string): string {
  return createHash('sha256').update(text).digest('hex');
}

export function passwordMatches(typed: string): boolean {
  const expected = process.env.ADMIN_PASSWORD_HASH ?? '';
  if (!expected) return false;
  const typedHash = sha256Hex(typed);
  try {
    return timingSafeEqual(Buffer.from(typedHash, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

export function makeSessionCookie(): string {
  const expires = Date.now() + MAX_AGE * 1000;
  const payload = `admin.${expires}`;
  const token = `${payload}.${sign(payload)}`;
  return `${COOKIE}=${token}; Path=/; Max-Age=${MAX_AGE}; HttpOnly; SameSite=Lax; Secure`;
}

export function clearSessionCookie(): string {
  return `${COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`;
}

export function isAuthenticated(cookieHeader: string | null | undefined): boolean {
  if (!cookieHeader) return false;
  const match = cookieHeader.split(/;\s*/).find((p) => p.startsWith(`${COOKIE}=`));
  if (!match) return false;
  const token = match.slice(COOKIE.length + 1);
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [kind, expires, sig] = parts;
  const payload = `${kind}.${expires}`;
  const expected = sign(payload);
  try {
    if (!timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expected, 'hex'))) return false;
  } catch {
    return false;
  }
  if (Date.now() > Number(expires)) return false;
  return kind === 'admin';
}
