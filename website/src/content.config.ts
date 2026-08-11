import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
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
