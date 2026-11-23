// Per-page Open Graph image. Serves /og/{kind}/{slug}.png for every content
// entry across the journal, work and events collections.
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderOgImage } from '../../../lib/og';
import { site } from '../../../site.config';

type Kind = 'journal' | 'work' | 'events';

export const getStaticPaths: GetStaticPaths = async () => {
  const kinds: Kind[] = ['journal', 'work', 'events'];
  const paths = [];
  for (const kind of kinds) {
    const entries = await getCollection(kind, ({ data }) => !data.draft);
    for (const entry of entries) {
      const data = entry.data as { title: string; description?: string };
      paths.push({
        params: { kind, slug: entry.id },
        props: { title: data.title, subtitle: data.description ?? '' },
      });
    }
  }
  return paths;
};

export const GET: APIRoute = async ({ props }) => {
  const { title, subtitle } = props as { title: string; subtitle: string };
  const png = await renderOgImage({
    title,
    subtitle,
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
