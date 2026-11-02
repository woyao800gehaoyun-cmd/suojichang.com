import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['选购指南', '线路与协议', '设备教程', '使用场景', '故障排查']),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    readingMinutes: z.number(),
    featured: z.boolean().default(false),
    keywords: z.array(z.string()).default([])
  })
});

export const collections = { articles };
