# Yonah Website Engine

Premium website base: 159 Astro components, 20 design families, and bundled FFmpeg for video.

## New client project

```sh
git clone https://github.com/jemimahwarren3-max/basee.git my-client
cd my-client
npm install
npm run check-tools     # confirms ffmpeg and ffprobe run
npm run dev
```

Copy `.env.example` to `.env.local` and add any API keys you have. Never commit `.env.local`.

## Video frames

Put a clip in the project, then:

```sh
npm run extract-frames -- path/to/clip.mp4 public/frames 30 1920
```

This writes `public/frames/frame_0001.webp`, `frame_0002.webp`, and so on, for `ScrollSequence`.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run check` | Type check, build and lint |
| `npm run check-tools` | Verify FFmpeg binaries |
| `npm run extract-frames` | Video to WebP frame sequence |

## Design families

editorial-luxury · swiss-minimalism · modern-brutalism · dark-technology · warm-hospitality · fashion-commerce · property-editorial · professional-healthcare · corporate-institutional · contemporary-african · premium-automotive · architecture-interiors · minimalist-portfolio · creative-photography · restaurant-editorial · beauty-cosmetics · education-institution · finance-consulting · industrial-manufacturing · modern-ecommerce

## Stack

Astro 7, React 19, TypeScript, Tailwind CSS v4, GSAP, Lenis, Motion, FFmpeg (bundled), oxlint.
