# Yonah Website Engine

A toolkit base for building client websites. Clone it, fill in the config, and compose pages from the component library. This repo is not a specific site — spa or otherwise. It's the starting point for any site.

## What's in the box

- **162 Astro components** across 15 categories in `src/components/`. The registry in `src/components/registry.ts` is generated from the files by `npm run registry`.
- **20 design families** in `src/design-families/`. Each is a typed token set — typography, colours, spacing, imagery, navigation, animation, buttons. A family drives the look with one attribute.
- **A theme layer** in `src/design-families/theme.ts`. Turns a family into CSS variables and a Google Fonts link.
- **A site layout** at `src/layouts/Site.astro`. Takes a family id and applies its tokens.
- **A per-client config** at `src/site.config.ts`. One file for name, nav, contact, forms, socials.
- **Effect components** in `src/components/effects/`: smooth scrolling (Lenis), scroll-driven image sequences (GSAP), text with image masked through letters.
- **Media tools**: bundled FFmpeg (`npm run extract-frames`), sharp (`npm run optimise-images`).
- **Browser smoke tests** (`npm test`) and a launch-readiness gate for bracketed placeholders.
- **SEO essentials:** canonical, Open Graph, Twitter Card, optional JSON-LD, plus a sitemap from `@astrojs/sitemap`. Set `SITE_URL` at build time.
- **Journal (blog):** content collection at `src/content/journal/`, listing at `/journal`, post route at `/journal/[slug]`.
- **Admin preview UI:** layout at `src/layouts/Admin.astro` with sidebar, plus dashboard components under `src/components/admin/`. Ships with a client-side password gate (`AuthGate.astro`) that hides the UI until the correct password is typed. **The gate is a deterrent, not real security — the HTML is still served.** See the Security section below for real options.
- **Form backend adapter** (`src/lib/forms.ts`): `BookingEnquiry` and `ContactForm` post via `fetch` to the endpoint in `site.forms.{booking,enquiry}`. Works with Formspree, Web3Forms, Netlify Forms or a custom endpoint.

## Building a client site

1. **Clone and install.**
   ```sh
   git clone https://github.com/jemimahwarren3-max/basee.git my-client
   cd my-client
   npm install
   npm run check-tools
   npm run dev
   ```

2. **Fill in `src/site.config.ts`.** Brand name, design family, navigation, contact details. Leave a field empty to hide it.

3. **Pick a design family.** Browse `src/design-families/*.ts` and set `site.family`. The family's `preferredSections` and `preferredHero` are suggestions; the page can use anything.

4. **Build the home page.** Replace `src/pages/index.astro` with your own composition. Look at `src/pages/_examples/spa.astro` and `_examples/fashion.astro` for how to compose components.

5. **Add images and video.** Put real files under `public/`. Run `npm run optimise-images -- public/raw public/images` to produce WebP at 480, 960 and 1600px. For a scroll sequence, run `npm run extract-frames -- clip.mp4 public/frames 30 1920` and point `ScrollSequence` at `/frames/frame_{n}.webp`.

6. **Wire forms.** `BookingEnquiry` and `ContactForm` do not submit anywhere by default. Set `site.forms.enquiry` or `site.forms.booking` to an endpoint. Options: Cal.com embed for time slots, Formspree or Web3Forms for free email enquiries, or a custom endpoint. See each form component for the shape.

7. **Verify before launch.**
   ```sh
   npm run check          # type check, build, lint
   npm test               # smoke-test every page
   LAUNCH_CHECK=1 npm test  # also fail on [placeholder] text
   ```

## Ground rules

- **Never fabricate.** Do not invent testimonials, prices, awards, press coverage, or contact details. Use bracketed placeholders like `[Guest quote]` until the client supplies the real thing. The launch gate fails while any remain.
- **Ask before anything costly.** Paid API calls, publishing, or touching an account need approval.
- **Each client gets their own art direction.** The design families are starting points, not stencils. Don't reuse one client's confidential assets in another's project.
- **Secrets live in `.env.local`**, never in source.

## Commands

```
npm run dev              Astro dev server
npm run build            Production build
npm run preview          Preview the build
npm run check            tsc, build, lint
npm run check-tools      Verify FFmpeg binaries
npm run registry         Rebuild src/components/registry.ts
npm run extract-frames   Video to WebP frame sequence
npm run optimise-images  Photos to responsive WebP sizes
npm test                 Playwright smoke tests
npm run lint             oxlint
```

## Layout

```
src/
  components/            162 Astro components, grouped by category
    registry.ts          generated — do not edit by hand
    index.ts             lookups: getComponent, familiesPreferring, etc.
  design-families/       20 typed token sets
    types.ts
    theme.ts             family → CSS variables + fonts
    index.ts             getFamily, findFamiliesForIndustry
  layouts/
    Base.astro           barebones HTML skeleton
    Site.astro           takes a family id, applies tokens, imports fonts
  pages/
    index.astro          starter page — replace per client
    _examples/           reference demos, not shipped
  styles/global.css      base utilities and reduced-motion handling
  site.config.ts         per-client config
scripts/
  build-registry.mjs
  check-tools.mjs
  extract-frames.mjs
  optimise-images.mjs
tests/
  pages.spec.ts          smoke + launch gate
```

## Admin security

Three options, best first:

1. **Hosting-level auth (recommended).**
   - Netlify: Site settings → Access & security → Visitor access → protect `/admin/*` with a password or role.
   - Cloudflare Pages: add a Zero Trust Access policy on `/admin/*`. Free tier is enough for most sites.
2. **Astro server mode.** Switch `output: 'server'` in `astro.config.mjs`, pick an adapter (`@astrojs/node`, `@astrojs/netlify`, `@astrojs/cloudflare`), and add `src/middleware.ts` that checks a session cookie for `/admin/*` routes. Real auth, works anywhere.
3. **The built-in UI gate.** The AuthGate component checks a SHA-256 hash against the typed password. It only hides the UI; anyone who inspects the page source sees the HTML. Set `ADMIN_PASSWORD_HASH` in `.env.local` via `npm run hash-password -- 'your password'`. Use this as a stop-gap, not a final answer.

## Known gaps

- Admin pages have no login. Use Netlify Password Protection, Cloudflare Access, or add a real backend for auth.
- The admin dashboard reads from static data. Connect a backend (Formspree inbox API, Cal.com API, a database) before it shows anything real.
- No e-commerce checkout glue yet. Product components exist; pick an adapter like Snipcart or Shopify Lite when a project needs to sell.
- The design families are fonts and colours only, not full pattern languages. If a site needs a very specific visual identity, build custom sections for it rather than forcing a family.
