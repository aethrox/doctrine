import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	skills: defineCollection({
		loader: glob({
			pattern: '*/SKILL.md',
			base: new URL('../../skills', import.meta.url),
			retainBody: false,
		}),
		schema: z.object({
			name: z.string(),
			description: z.string(),
		}),
	}),
};
