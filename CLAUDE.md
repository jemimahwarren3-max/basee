# Yonah Website Engine

A premium website production base for Yonah Studio. Clone it, open it in Claude Code, describe
the website you want — Claude picks from 159 pre-built components and 20 design families to
assemble a production site in minutes.

## How to use this base

1. Clone the repo for a new client project
2. Open in Claude Code
3. Describe the website (industry, style, pages needed)
4. Claude selects a design family from `src/design-families/`, picks matching components from
   `src/components/`, wires them into pages under `src/pages/`, and applies the design tokens

## Component library (159 components, 15 categories)

All components live in `src/components/` as `.astro` files with TypeScript props interfaces.
They use CSS custom properties (`--color-*`) for theming, Tailwind CSS classes for layout, and
are fully responsive.

| Category     | Count | Path                          |
|-------------|-------|-------------------------------|
| Heroes       | 20    | `src/components/heroes/`      |
| Interactive  | 22    | `src/components/interactive/` |
| Services     | 16    | `src/components/services/`    |
| About        | 12    | `src/components/about/`       |
| Galleries    | 12    | `src/components/galleries/`   |
| Navigation   | 10    | `src/components/navigation/`  |
| Footers      | 10    | `src/components/footers/`     |
| Products     | 10    | `src/components/products/`    |
| Testimonials | 8     | `src/components/testimonials/`|
| Statistics   | 8     | `src/components/statistics/`  |
| Contact      | 8     | `src/components/contact/`     |
| CTA          | 8     | `src/components/cta/`         |
| Pricing      | 7     | `src/components/pricing/`     |
| FAQ          | 5     | `src/components/faq/`         |
| Common       | 3     | `src/components/common/`      |

## Design families (20 families)

Each family in `src/design-families/` defines typography, colors, spacing, layout preferences,
imagery treatment, navigation style, animation intensity, and button styling. Use
`getFamily(id)` or `findFamiliesForIndustry(industry)` from `src/design-families/index.ts`.

Families: editorial-luxury, swiss-minimalism, modern-brutalism, dark-technology,
warm-hospitality, fashion-commerce, property-editorial, professional-healthcare,
corporate-institutional, contemporary-african, premium-automotive, architecture-interiors,
minimalist-portfolio, creative-photography, restaurant-editorial, beauty-cosmetics,
education-institution, finance-consulting, industrial-manufacturing, modern-ecommerce

## Stack

Astro 7, React 19 (islands), TypeScript, Tailwind CSS v4 (via `@tailwindcss/vite`),
Motion 14, Lucide React, clsx, Playwright, oxlint.

## Ground rules

- **Never fabricate.** Don't claim a build succeeded without running it.
- **Ask before anything irreversible or costly.** Publishing, paid APIs, or touching accounts
  need approval.
- **No placeholder modules presented as working.**
- **Each client project gets its own art direction.** Don't default to generic AI-website looks.
- **Secrets live in `.env.local`**, never in source or commits.

## Commands

```
npm run dev       # Astro dev server
npm run build     # production build
npm run preview   # preview production build
npm run lint      # oxlint
```

## Assembling a website from a brief

When given a client brief:

1. **Pick a design family** — match the client's industry and aesthetic to one of the 20
   families using `findFamiliesForIndustry()` or manual selection
2. **Set design tokens** — apply the family's colors, typography, and spacing as CSS custom
   properties in `src/styles/global.css` or a page-level `<style>` block
3. **Choose components** — select components from each category that match the family's
   `layout.preferredSections` and avoid its `layout.avoidSections`
4. **Create pages** — wire components into Astro pages under `src/pages/`, passing appropriate
   props with real client content
5. **Build and verify** — run `npm run build` to confirm everything compiles cleanly
