import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const leistungen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/leistungen' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      kurz: z.string(),
      description: z.string(),
      image: image(),
      imageAlt: z.string(),
      highlights: z.array(z.string()),
      order: z.number(),
    }),
});

const moebel = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/moebel' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      typ: z.string(),
      kategorie: z.enum(['Tische', 'Sitzen', 'Aufbewahrung']),
      description: z.string(),
      preisAb: z.number(),
      hoelzer: z.array(z.string()),
      masse: z.string(),
      lieferzeit: z.string(),
      image: image(),
      imageAlt: z.string(),
      details: z.array(z.object({ image: image(), alt: z.string() })).default([]),
      featured: z.boolean().default(false),
      order: z.number(),
    }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      autor: z.string(),
      kategorie: z.string(),
      image: image(),
      imageAlt: z.string(),
    }),
});

export const collections = { leistungen, moebel, journal };
