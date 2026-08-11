# Doctrine Wiki

Astro Starlight source for the bilingual Doctrine documentation site.

```bash
npm install
npm run dev
npm run build
```

English content lives in `src/content/docs/`. Turkish content uses matching paths under `src/content/docs/tr/`. Missing Turkish pages fall back to English.

The skill catalog reads names and descriptions directly from `../skills/*/SKILL.md`; do not maintain a second hand-written catalog.
