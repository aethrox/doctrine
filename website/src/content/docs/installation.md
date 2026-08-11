---
title: Installation
description: Choose the Doctrine installation method supported by your AI coding client.
---

Doctrine can be delivered as a native plugin, through an MCP server, or by copying skill files manually. The skill content is the same, but discovery and invocation differ by client.

## Choose a method

| Method | Use it when | Important behavior |
|---|---|---|
| Native plugin | Your client supports the Doctrine plugin | The client may select skills from their descriptions |
| MCP server | Your client supports MCP prompts | Doctrine skills appear as prompts; selection behavior depends on the client |
| Manual copy | Your client supports local instruction or skill files | You control where the files are placed and when they are updated |

## Claude Code plugin

This is the shortest installation path for Claude Code:

```text
/plugin marketplace add aethrox/doctrine
/plugin install doctrine
```

After installation, explicitly request a skill once to verify it is available:

> Use the Doctrine `explain-plainly` skill to explain the difference between a test and a code review.

Automatic selection is useful, but it is not a reliable installation test.

## MCP server

The MCP route requires Node.js 18 or newer. Add Doctrine as a local MCP server using the configuration format supported by your client:

```json
{
  "mcpServers": {
    "doctrine": {
      "command": "npx",
      "args": ["-y", "github:aethrox/doctrine"]
    }
  }
}
```

The location of this configuration differs between clients. The `command` and `args` values remain the same. You can also start the server directly:

```bash
npx github:aethrox/doctrine
```

Doctrine registers every `SKILL.md` file as an MCP prompt. MCP defines prompts as user-controlled templates. A client may show them in a prompt menu, expose them through a command, or provide additional automation. Do not assume that installing the MCP server makes every skill activate automatically.

## Manual installation

Clone the repository:

```bash
git clone https://github.com/aethrox/doctrine.git
```

Then copy the required skill directories into the skill or instruction location documented by your client. For a client that reads `~/.claude/skills`, this Bash command copies every Doctrine skill:

```bash
for s in doctrine/skills/*/; do
  name=$(basename "$s")
  cp -r "$s" ~/.claude/skills/"$name"/
done
```

Manual installations do not update automatically. Pull the latest Doctrine changes and copy the files again when you want to update.

## Verify the installation

1. Invoke `explain-plainly` by its exact name.
2. Ask it to explain the difference between a skill and a tool.
3. Confirm that the answer follows the skill's plain-language discipline.

If the skill does not appear, confirm that your client supports the chosen method, recheck its configured path, and restart clients that only discover integrations at startup.
