---
title: Advanced
description: Create or adapt a Doctrine skill when the same engineering situation keeps coming up.
---

Create a skill when the same recognizable situation keeps benefiting from the same way of working. Use a prompt for a one-time request. Keep repository-specific rules in that repository's instruction files.

## When a Doctrine skill is appropriate

- The task recurs.
- The trigger situation can be described clearly.
- The skill gives the agent concrete steps to follow.
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

The `name` must match the directory name exactly. In the body, include the rule that defines the skill, numbered phases with concrete steps, useful reference material, and a final checklist whose results you can observe.

## Write the description as a routing contract

The description acts as a routing contract: it helps the client decide when this skill is the right one. A useful description answers:

- What job does the skill perform?
- When should an agent select it?
- Which phrases or situations indicate a match?
- Which similar skill does it not replace?

Test three cases: someone names the skill directly, the client selects it from the task, and a similar task should not trigger it.

## Keep agent-facing writing operational

Build the skill around numbered steps. Make definitions, tables, and checklists easy to scan. Move background history elsewhere unless it changes the work. A `SKILL.md` should read like a procedure the agent can follow, not a tutorial.

## Local customization or Doctrine contribution

Keep company policy, private vocabulary, and personal workflow preferences local. A skill may belong in Doctrine if it works across projects and products, has precise triggers, draws on a named source, and adds a distinct discipline.

## Validate a contribution

From the repository root:

```bash
npm install
npm test
```

These tests check the YAML frontmatter, directory-name matching, MCP prompt discovery, exact prompt content, and the packaged server.
