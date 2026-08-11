---
title: Core Concepts
description: Get comfortable with models, clients, agents, tools, skills, prompts, context, MCP, and SKILL.md.
---

You do not need to know how a language model is built. To work safely with one, it helps to know which part of the system provides instructions, capabilities, information, and permission to act.

## The main terms

| Term | Plain meaning |
|---|---|
| **Model** | The language model that interprets information and responds |
| **Client** | The product or app you use to interact with the model |
| **Agent** | A model-driven system that can pursue a task using context and available tools |
| **Prompt** | A request or instruction you give the model |
| **Context** | The conversation, files, instructions, and tool results currently available to the agent |
| **Tool** | A capability such as reading a file, running a command, or searching documentation |
| **Skill** | Reusable instructions for handling a recognizable kind of task |
| **Plugin** | A product-specific package that may contain skills, tools, or integrations |
| **MCP** | A shared protocol that lets clients access prompts, tools, and resources from external servers |
| **Permission** | Human approval or a policy that allows an action |
| **Sandbox** | A boundary that limits which files, commands, or systems an agent can access |

A skill tells the agent **how to work**. A tool lets it **perform an action**. Permission determines whether that action is allowed.

## What a Doctrine skill contains

Each Doctrine skill lives in a directory such as:

```text
skills/research/SKILL.md
```

The file begins with YAML frontmatter, a metadata block between two sets of three dashes:

```yaml
---
name: research
description: Investigate a technical question against primary sources...
---
```

### `name`

This is the skill's stable identifier. In Doctrine, it must match the directory name exactly.

### `description`

This is the routing contract: the text a client uses to decide when the skill fits. It says what the skill does and when to use it. If it is too broad, the skill may activate for unrelated work. If it is too narrow, the client may never find it.

### The body

The body of a Doctrine skill usually contains:

1. A defining rule that makes the skill different from the obvious default.
2. Numbered phases with concrete rules.
3. A closing checklist that defines what completion means.

A completed checklist is not proof on its own. The agent still needs to run the relevant checks and show you the results.

## How a skill is selected

A skill can be invoked explicitly:

> Use `diagnosing-bugs` to investigate this failure. Diagnose the cause, but do not implement a fix yet.

A compatible client may also select the skill automatically when your task matches its description. Naming it yourself is clearer while you are learning, when several skills could fit, or when the task has important boundaries.

## The same content, different delivery

Doctrine currently supports three delivery forms:

- A native skill in a compatible skill system.
- A skill packaged through a product plugin.
- An MCP prompt served by Doctrine's MCP server.

They contain the same skill, but they may not activate it in the same way. MCP prompts, for example, are controlled by the user at the protocol level. A client may put its own interface or automation on top.

## Skills do not replace judgment

You are still responsible for approving destructive or external actions, reviewing changes, protecting credentials, deciding whether the result meets your needs, and stopping the work if its scope changes.
