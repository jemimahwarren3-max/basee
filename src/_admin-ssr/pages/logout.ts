// Signs the user out. Works in server mode only.
export const prerender = false;

import type { APIRoute } from 'astro';
import { clearSessionCookie } from '../../lib/auth';

export const GET: APIRoute = () => {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/admin/login',
      'Set-Cookie': clearSessionCookie(),
    },
  });
};
