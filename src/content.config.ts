import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    description: z.string(),
    year: z.coerce.number().optional(),
    role: z.string().optional(),
    cover: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    url: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    venue: z.string().optional(),
    address: z.string().optional(),
    cover: z.string().optional(),
    url: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { journal, work, events };
