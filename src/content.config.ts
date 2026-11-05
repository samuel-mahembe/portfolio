import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.string(),
    /** Lower numbers appear first. */
    order: z.number(),
    flagship: z.boolean().default(false),
    /** Upcoming projects show a short card and get no detail page. */
    upcoming: z.boolean().default(false),
    /** Drafts are held off the site until their facts are confirmed. */
    draft: z.boolean().default(false),
    stack: z.array(z.string()),
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    start: z.string(),
    end: z.string(),
    location: z.string(),
    /** Lower numbers appear first. */
    order: z.number(),
    volunteer: z.boolean().default(false),
    platforms: z.array(z.object({ name: z.string(), description: z.string() })).default([]),
    tech: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, experience };
