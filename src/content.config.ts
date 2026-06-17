import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Series / Volumes metadata
const seriesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/series' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    order: z.number(),
  }),
});

// Individual works (images & monologues)
const worksCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/works' }),
  schema: z.object({
    series: z.string(), // ID of the series/volume it belongs to (e.g. 'vol-01')
    imageUrl: z.string(), // 86img CDN URL
    order: z.number(),
    monologue: z.string().optional(),
    
    // Optional overrides (procedural layouts are used if omitted)
    layout: z.enum([
      'full',
      'medium-left',
      'medium-right',
      'small-center',
      'scatter-left',
      'scatter-right',
      'pair',
      'text-only-center',
      'text-only-vertical',
      'text-only-skew'
    ]).optional(),
    spacing: z.enum(['none', 'small', 'medium', 'large', 'huge']).optional(),
    textPosition: z.enum([
      'overlay-top-left',
      'overlay-top-right',
      'overlay-bottom-left',
      'overlay-bottom-right',
      'side-left',
      'side-right',
      'under'
    ]).optional(),
  }),
});

export const collections = {
  'series': seriesCollection,
  'works': worksCollection,
};
