---
title: Contributing
description: Improve Doctrine skills, documentation, translations, and repository behavior.
---

Doctrine welcomes focused corrections, standards-grounded skills, documentation improvements, and translations. Keep each contribution centered on one intent so it can be reviewed and verified independently.

## Before changing a skill

Read the complete existing `SKILL.md`, related skills it references, the relevant part of `WORKFLOW.md`, and the named primary standard or established practice.

Preserve the distinction between skills. Expanding one skill until it absorbs adjacent responsibilities makes routing less reliable.

## Add or improve a skill

1. Create or update `skills/<name>/SKILL.md`.
2. Keep `name` identical to the directory name.
3. Write `description` as a precise routing contract.
4. Ground the discipline in a named source.
5. Include a defining constraint, phases, and closing checklist.
6. Update `README.md` and `WORKFLOW.md` when the catalog or lifecycle changes.
7. Update hard-coded skill totals where applicable.
8. Run the complete test command.

## Contribute documentation

Skill names and descriptions must come from `skills/*/SKILL.md`, the source of truth. Guides may explain those facts in beginner-friendly language, but should not maintain a second hand-written catalog that can drift.

Documentation should lead with what the reader can do, define unfamiliar terms, use short task-focused pages, include observable verification, and avoid copy-paste tutorial loops.

## Contribute a translation

English is the canonical language. Turkish pages live under the matching `/tr/` path.

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

Do not open a pull request with a known failing check unless the failure itself is the subject of the contribution and is explained clearly.

## Commit style

Use Conventional Commits and separate unrelated changes:

```text
feat: add accessibility review skill
fix: narrow research skill trigger
docs: explain manual installation
```

See the repository's full [contribution guide](https://github.com/aethrox/doctrine/blob/main/CONTRIBUTING.md) before opening a pull request.
