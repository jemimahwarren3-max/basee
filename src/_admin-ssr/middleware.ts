// Astro middleware. Protects /admin/* with a signed session cookie when the
// site is built in server mode. In static mode (the default), middleware
// never runs — the client-side AuthGate deterrent is the only protection.
//
// See src/lib/auth.ts for how to switch to server mode.
import { defineMiddleware } from 'astro:middleware';
import { isAuthenticated } from '../lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;
  const isAdmin = path.startsWith('/admin');
  const isLogin = path === '/admin/login' || path === '/admin/login/';

  if (isAdmin && !isLogin && !isAuthenticated(context.request.headers.get('cookie'))) {
    return context.redirect(`/admin/login?next=${encodeURIComponent(path)}`);
  }

  return next();
});
