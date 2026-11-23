# Real admin auth (SSR mode)

The base ships with static-only output and a client-side `AuthGate` deterrent on the admin. To upgrade the admin to real server-side auth with signed cookies, switch to Astro server mode and move these files into place.

## Activate

1. Install a server adapter:
   ```sh
   npm install @astrojs/node
   ```

2. Edit `astro.config.mjs`:
   ```js
   import node from '@astrojs/node';
   export default defineConfig({
     output: 'server',
     adapter: node({ mode: 'standalone' }),
     // …everything else stays the same
   });
   ```

3. Move the middleware and login/logout files into place:
   ```sh
   mv src/_admin-ssr/middleware.ts src/
   mv src/_admin-ssr/pages/login.astro src/pages/admin/
   mv src/_admin-ssr/pages/logout.ts src/pages/admin/
   ```

4. Set env in `.env.local`:
   ```
   ADMIN_PASSWORD_HASH=<from: npm run hash-password -- 'password'>
   ADMIN_SESSION_SECRET=<openssl rand -hex 32>
   ```

5. Add a logout link to the admin sidebar (optional):
   ```html
   <a href="/admin/logout">Sign out</a>
   ```

6. `AuthGate.astro` becomes redundant — remove it from `Admin.astro` if you want.

## How it works

- `src/middleware.ts` runs on every request. It redirects any `/admin/*` route to `/admin/login` unless the request carries a valid session cookie.
- `src/lib/auth.ts` holds the cookie signing, hash check, and verify helpers. HMAC-SHA256 with `ADMIN_SESSION_SECRET`.
- The login page checks the typed password against `ADMIN_PASSWORD_HASH` with `timingSafeEqual`, sets the cookie, and redirects.

In static mode the middleware never runs. It's safe to ship; it does nothing until SSR is active.
