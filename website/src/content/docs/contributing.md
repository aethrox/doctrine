---
title: Contributing
description: Help improve Doctrine skills, documentation, translations, or repository behavior.
---

Contributions are welcome, from focused fixes and standards-based skills to clearer documentation and translations. Keep each contribution about one thing so reviewers can understand and verify it on its own.

## Before changing a skill

Read the full `SKILL.md`, any related skills it mentions, the relevant section of `WORKFLOW.md`, and the primary standard or established practice it is based on.

Keep each skill's purpose distinct. If one skill starts taking on its neighbors' jobs, clients will have a harder time choosing the right one.

## Add or improve a skill

1. Create or update `skills/<name>/SKILL.md`.
2. Keep `name` identical to the directory name.
3. Write `description` so a client can tell exactly when to use the skill.
4. Ground the discipline in a named source.
5. Include a defining constraint, phases, and closing checklist.
6. Update `README.md` and `WORKFLOW.md` when the catalog or lifecycle changes.
7. Update hard-coded skill totals where applicable.
8. Run the complete test command.

## Contribute documentation

Treat `skills/*/SKILL.md` as the source of truth for skill names and descriptions. Guides can explain them in beginner-friendly language, but should not keep a separate hand-written catalog that will drift out of date.

Start with what the reader can do. Define unfamiliar terms, keep pages short and focused on a task, and include a result the reader can check. Help people make decisions instead of leading them through copy-paste tutorial loops.

## Contribute a translation

English is the canonical language, meaning it is the version other translations follow. Turkish pages use the matching `/tr/` path.

- Preserve commands, paths, code, and skill names exactly.
- Translate meaning, not sentence structure.
- Do not delay an English correction solely because its translation is incomplete.
- Let the site show its English fallback when a Turkish page is not ready.

## Run the checks

Doctrine requires Node.js 18 or newer:

```bash
npm install
npm test
```

Do not open a pull request with a known failing check unless your contribution is about that failure and the pull request explains it clearly.

## Commit style

Use Conventional Commits and separate unrelated changes:

```text
feat: add accessibility review skill
fix: narrow research skill trigger
docs: explain manual installation
```

Before opening a pull request, read the repository's full [contribution guide](https://github.com/aethrox/doctrine/blob/main/CONTRIBUTING.md).
