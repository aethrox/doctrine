// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://aethrox.github.io',
	base: '/doctrine',
	integrations: [
		starlight({
			title: 'Doctrine Wiki',
			description: 'Learn to use Doctrine engineering skills with clarity, evidence, and control.',
			favicon: '/doctrine-banner.png',
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				tr: { label: 'Türkçe', lang: 'tr' },
			},
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'meta',
					attrs: {
						property: 'og:image',
						content: 'https://aethrox.github.io/doctrine/doctrine-banner.png',
					},
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:card', content: 'summary_large_image' },
				},
			],
			editLink: {
				baseUrl: 'https://github.com/aethrox/doctrine/edit/main/website/',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/aethrox/doctrine' }],
			sidebar: [
				{
					label: 'Start Here',
					translations: { tr: 'Buradan Başla' },
					items: [
						{ slug: 'start-here' },
						{ slug: 'installation' },
						{ slug: 'core-concepts' },
						{ slug: 'first-project' },
						{ slug: 'project-workflow' },
					],
				},
				{
					label: 'Skills',
					translations: { tr: "Skill'ler" },
					items: [{ slug: 'skill-catalog' }],
				},
				{
					label: 'Advanced',
					translations: { tr: 'İleri Seviye' },
					collapsed: true,
					items: [{ slug: 'advanced' }, { slug: 'contributing' }],
				},
			],
		}),
	],
});
