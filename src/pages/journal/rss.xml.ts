import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site as cfg } from '../../site.config';

export async function GET(context: APIContext) {
  const posts = (await getCollection('journal', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: cfg.name ? `${cfg.name} — Journal` : 'Journal',
    description: cfg.description || 'Articles and updates.',
    site: context.site ?? 'https://example.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/journal/${post.id}/`,
      author: post.data.author,
      categories: post.data.tags,
    })),
  });
}
