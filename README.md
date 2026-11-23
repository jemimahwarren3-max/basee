# Yonah Website Engine

A toolkit base for building client websites. **179 Astro components**, **20 design families**, content collections, admin UI, Snipcart commerce, OG images, a11y tests, deploy configs for Netlify, Vercel and Cloudflare Pages.

Cloned per client. Not a specific site.

---

## Getting started

### 1. Clone and install

```sh
git clone https://github.com/jemimahwarren3-max/basee.git my-client
cd my-client
npm install
npm run check-tools     # confirms the bundled ffmpeg and ffprobe run
npm run dev             # http://localhost:4321
```

Copy `.env.example` → `.env.local` (git-ignored). You can leave it empty for now.

### 2. Set the brand

Open `src/site.config.ts` and fill in what you have. The site reads everything from this one file:

```ts
export const site = {
  name: 'Serenité',
  family: 'beauty-cosmetics',           // pick from src/design-families/
  title: 'Serenité Spa — Luxury Wellness',
  description: 'Escape into tranquility.',
  nav: [
    { label: 'Treatments', href: '#treatments' },
    { label: 'Contact', href: '#contact' },
  ],
  primaryCta: { label: 'Book', href: '#book' },
  contact: { email: 'hello@serenite.co.za', whatsapp: '27612345678', /* … */ },
  forms: {
    enquiry: 'https://formspree.io/f/xxxxxxxx',  // or Web3Forms, Netlify
    booking: 'https://cal.com/you/consultation',
  },
  commerce: { snipcartApiKey: '', currency: 'USD' },
  // …
};
```

Leave any field blank to hide it.

### 3. Pick a design family

Browse `src/design-families/*.ts` — each sets fonts, colours, radii and spacing. The `Site` layout applies them automatically.

Available: editorial-luxury, swiss-minimalism, modern-brutalism, dark-technology, warm-hospitality, fashion-commerce, property-editorial, professional-healthcare, corporate-institutional, contemporary-african, premium-automotive, architecture-interiors, minimalist-portfolio, creative-photography, restaurant-editorial, beauty-cosmetics, education-institution, finance-consulting, industrial-manufacturing, modern-ecommerce.

### 4. Build the pages

The starter ships with `/`, `/about`, `/work`, `/contact`, `/journal`, `/events`, `/404` — all using `SiteNav` and `SiteFooter` wrappers. Replace their content with the client's own.

Browse the full component library at **`/admin/showcase`** in dev mode — search, filter by category, see props and file paths.

For custom pages, compose components:

```astro
---
import Site from '../layouts/Site.astro';
import SiteNav from '../components/common/SiteNav.astro';
import HeroCinematic from '../components/heroes/HeroCinematic.astro';
import { site } from '../site.config';
---
<Site title={site.title} description={site.description} family={site.family}>
  <SiteNav />
  <HeroCinematic
    image="/img/hero.jpg"
    title="Your bold headline"
    cta={{ label: 'Book', href: '#book' }}
  />
</Site>
```

### 5. Add content

Three content collections live under `src/content/`:

```sh
src/content/journal/*.md      # blog posts
src/content/work/*.md         # case studies
src/content/events/*.md       # upcoming + past events
```

Each has schema and frontmatter — see the sample entries. Posts render at `/journal`, `/work`, `/events`.

For browser-based editing, Decap CMS is set up at `/cms/` — configure the backend in `public/cms/config.yml`.

### 6. Drop in images and video

```sh
# Optimise photos to responsive WebP (480, 960, 1600 widths + original)
npm run optimise-images -- public/raw public/img

# Turn a video into scroll-sequence frames
npm run extract-frames -- clip.mp4 public/frames 30 1920
```

### 7. Wire forms

The booking and contact forms post to whatever endpoint you set in `site.config.forms`. They include a honeypot + submit-timer spam guard out of the box.

Tested with: **Formspree**, **Web3Forms**, **Netlify Forms**, **Cal.com** embed. Any `fetch`-friendly endpoint works.

### 8. Verify before launch

```sh
npm run check              # tsc + build + lint
npm test                   # Playwright smoke + axe-core a11y (light & dark) + perf
LAUNCH_CHECK=1 npm test    # also fail on remaining [placeholder] text
```

### 9. Deploy

Pick a host and delete the configs for the others:

- **Netlify** — `netlify.toml`. Admin auth: Site settings → Access & security.
- **Vercel** — `vercel.json`. Admin auth: available on Pro.
- **Cloudflare Pages** — `wrangler.toml`. Admin auth: Zero Trust → Access policy on `/admin/*`.

`public/_headers` applies to Netlify and Cloudflare Pages (security headers, OG cache, admin `noindex`). Vercel reads headers from `vercel.json`.

Set `SITE_URL` in your host's env to the live origin so canonical URLs and the sitemap are correct.

---

## What's in the box

| Capability | File / command |
|---|---|
| 179 Astro components (15 categories) | `src/components/` |
| 20 design families | `src/design-families/` |
| Component gallery | `/admin/showcase` |
| Family-aware nav & footer wrappers | `SiteNav.astro`, `SiteFooter.astro` |
| Light/dark theme toggle | `ThemeToggle.astro` |
| Brand mark (logo or wordmark) | `Brand.astro` |
| Scroll effects (image sequence, text mask, smooth scroll) | `src/components/effects/` |
| Bundled FFmpeg for video | `npm run extract-frames` |
| Sharp-based image optimiser | `npm run optimise-images` |
| Snipcart commerce | `src/components/commerce/` |
| Content collections (journal, work, events) | `src/content/` |
| Decap CMS for browser editing | `/cms/` |
| Admin UI with KPIs, charts, tables | `/admin/*` |
| Password gate (deterrent) | `AuthGate.astro` |
| Real SSR admin auth (opt-in) | `src/_admin-ssr/README.md` |
| Forms with AJAX + spam guard | `BookingEnquiry`, `ContactForm`, `FormSpamGuard` |
| SEO: canonical, OG, Twitter, JSON-LD, sitemap, RSS | `Site.astro` + `@astrojs/sitemap` + `@astrojs/rss` |
| Per-page OG images at build | `/og/{kind}/{slug}.png` |
| A11y tests (axe, light + dark) | `tests/a11y.spec.ts` |
| Deploy configs for 3 hosts | `netlify.toml`, `vercel.json`, `wrangler.toml` |
| Prettier + editorconfig | `.prettierrc.json`, `.editorconfig` |

See [CLAUDE.md](CLAUDE.md) for deeper notes, the security section, and known gaps.

## Commands

```
npm run dev              Astro dev server
npm run build            Production build
npm run preview          Preview the build
npm run check            tsc + build + lint
npm run check-tools      Verify FFmpeg binaries
npm run registry         Rebuild src/components/registry.ts
npm run extract-frames   Video to WebP frame sequence
npm run optimise-images  Photos to responsive WebP sizes
npm run hash-password    Hash an admin password for .env.local
npm run format           Prettier
npm run lint             oxlint
npm test                 Playwright smoke + a11y + perf
```

## Stack

Astro 7, React 19 (islands), TypeScript, Tailwind CSS v4, GSAP, Lenis, Motion, sharp, FFmpeg (bundled), Playwright, axe-core, oxlint, prettier.
