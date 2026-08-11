---
title: Core Concepts
description: Understand models, clients, tools, skills, prompts, context, MCP, and SKILL.md.
---

You do not need to understand how a language model is built. You do need to know which part of the system controls instructions, capabilities, information, and permissions.

## The main terms

| Term | Plain meaning |
|---|---|
| **Model** | The language model that interprets information and produces responses |
| **Client** | The product or application through which you interact with the model |
| **Agent** | A model-driven system that can pursue a task using context and available tools |
| **Prompt** | A request or instruction given to the model |
| **Context** | The conversation, files, instructions, and tool results currently available to the agent |
| **Tool** | A capability such as reading a file, running a command, or searching documentation |
| **Skill** | Reusable instructions for handling a recognizable kind of task |
| **Plugin** | A product-specific package that may contain skills, tools, or integrations |
| **MCP** | A protocol clients can use to access prompts, tools, and resources from external servers |
| **Permission** | Human approval or policy that allows an action |
| **Sandbox** | A boundary that limits which files, commands, or systems an agent can access |

A skill tells the agent **how to work**. A tool lets it **perform an action**. Permission determines whether that action is allowed.

## What a Doctrine skill contains

Each Doctrine skill lives in a directory such as:

```text
skills/research/SKILL.md
```

The file begins with YAML frontmatter:

```yaml
---
name: research
description: Investigate a technical question against primary sources...
---
```

### `name`

The stable skill identifier. In Doctrine, it must exactly match the directory name.

### `description`

The routing contract. It explains what the skill does and when it should be used. A description that is too broad may activate for unrelated work. One that is too narrow may never be discovered.

### The body

Doctrine skill bodies normally contain:

1. A defining constraint that distinguishes the skill from the obvious default.
2. Numbered phases with concrete rules.
3. A closing checklist that defines what completion means.

The checklist is not proof by itself. The agent must still run the relevant checks and show evidence.

## How a skill is selected

A skill can be invoked explicitly:

> Use `diagnosing-bugs` to investigate this failure. Diagnose the cause, but do not implement a fix yet.

A compatible client may also select it implicitly because the task matches its description. Explicit invocation is clearer while learning, when several skills could match, or when the task has important boundaries.

## The same content, different delivery

Doctrine currently supports three delivery forms:

- A native skill in a compatible skill system.
- A skill packaged through a product plugin.
- An MCP prompt served by Doctrine's MCP server.

These forms do not guarantee identical activation behavior. In particular, MCP prompts are user-controlled at the protocol level. A client may add its own interface or automation.

## Skills do not replace judgment

You remain responsible for approving destructive or external actions, reviewing changes, protecting credentials, deciding whether the result meets your need, and stopping work when the scope changes.
