import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const seriesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: './src/content/series' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string(),
    order: z.number(),
    works: z.array(z.object({
      imageUrl: z.string(),
      monologue: z.string().optional(),
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
    }))
  }),
});

export const collections = {
  'series': seriesCollection,
};
