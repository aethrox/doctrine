# Contributing

New to Doctrine contributions? Start with the Wiki's [contributing guide](https://aethrox.github.io/doctrine/contributing/), then use this file for repository-specific requirements.

## Adding a skill

1. Create `skills/<name>/SKILL.md` with YAML frontmatter:
   ```yaml
   ---
   name: <name>
   description: "One or two sentences: what discipline this encodes, and when to use it (trigger phrases, situations)."
   ---
   ```
   `name` must exactly match the directory name, and `description` must be non-empty; `npm test` enforces both.
2. Ground the skill in a real, named external standard or established practice, not invented convention, and cite it explicitly (RFC number, ISO standard, a named author's book or guide, etc.).
3. Follow the shape every other skill uses: a one-sentence defining constraint, numbered phases with concrete checkable rules, and a closing checklist. Read an existing skill (e.g. `skills/tdd/SKILL.md`) as a template.
4. Add a row to the skill table in [README.md](./README.md) and, if it interacts with other skills in the lifecycle, a mention in [WORKFLOW.md](./WORKFLOW.md).

## Running the tests

```bash
npm install
npm test
```

`smoke-test.mjs` validates every skill's frontmatter and spawns the MCP server for a real handshake; `pack-test.mjs` verifies the npm package installs and serves correctly. Both must pass before opening a PR.

## Commit style

This repo follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (`feat:`, `fix:`, `ci:`, etc.); see `git log` for examples.
