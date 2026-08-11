---
title: Advanced
description: Create or adapt Doctrine-style skills for recurring engineering work.
---

Write a new skill only when a recognizable situation repeatedly benefits from the same discipline. A one-time request belongs in a prompt. Repository-specific rules belong in that repository's instruction mechanism.

## When a Doctrine skill is appropriate

- The task recurs.
- The trigger situation can be described clearly.
- The procedure changes how the work is performed.
- Completion can be checked.
- The discipline is grounded in a named standard or established practice.

Do not create a skill for a vague preference such as “write good code.”

## Required structure

Create:

```text
skills/<name>/SKILL.md
```

Begin with YAML frontmatter:

```yaml
---
name: example-skill
description: "What discipline this encodes and the situations in which it should be used."
---
```

The `name` must match the directory name exactly. The body should contain a defining constraint, numbered phases with concrete rules, reference material where useful, and a closing checklist with observable completion conditions.

## Write the description as a routing contract

A useful description answers:

- What job does the skill perform?
- When should an agent select it?
- Which phrases or situations indicate a match?
- Which adjacent skill does it not replace?

Test explicit invocation, implicit selection, and a nearby situation where the skill should not activate.

## Keep agent-facing writing operational

Use numbered how-to steps as the spine. Keep definitions, tables, and checklists easy to scan. Move historical explanation elsewhere unless it changes what the agent must do. Avoid tutorial voice inside `SKILL.md`; the agent needs an executable procedure.

## Local customization or Doctrine contribution

Keep organization-specific policy, private vocabulary, and personal workflow preferences local. Consider contributing a skill to Doctrine when it applies across projects and products, has precise triggers, is grounded in a named source, and adds a distinct discipline.

## Validate a contribution

From the repository root:

```bash
npm install
npm test
```

The current tests validate YAML frontmatter, directory-name matching, MCP prompt discovery, exact prompt content, and the packaged server.
