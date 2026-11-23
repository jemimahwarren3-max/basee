// Default Open Graph image for the site, served at /og.png.
// To render per-page OG images, create src/pages/og/[slug].png.ts with
// getStaticPaths that supplies the title/subtitle for each page.
import type { APIRoute } from 'astro';
import { renderOgImage } from '../lib/og';
import { site } from '../site.config';

export const GET: APIRoute = async () => {
  const png = await renderOgImage({
    title: site.title || site.name || 'Website',
    subtitle: site.description || undefined,
    brand: site.name || undefined,
    family: site.family,
  });
  return new Response(png as unknown as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
