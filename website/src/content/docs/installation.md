---
title: Installation
description: Pick the Doctrine installation method that works with your AI coding client.
---

You can install Doctrine as a native plugin, connect it through an MCP server, or copy its skill files yourself. The skill content stays the same, but each client finds and starts skills differently.

## Choose a method

| Method | Use it when | Important behavior |
|---|---|---|
| Native plugin | Your client supports the Doctrine plugin | The client may choose skills from their descriptions |
| MCP server | Your client supports MCP prompts | Doctrine skills appear as prompts; selection behavior depends on the client |
| Manual copy | Your client supports local instruction or skill files | You choose where the files go and when to update them |

## Claude Code plugin

For Claude Code, the shortest installation path is:

```text
/plugin marketplace add aethrox/doctrine
/plugin install doctrine
```

After installation, name a skill directly to check that it is available:

> Use the Doctrine `explain-plainly` skill to explain the difference between a test and a code review.

Automatic selection is useful, but it does not reliably prove the installation worked.

## MCP server

The MCP option requires Node.js 18 or newer. MCP is a shared protocol that lets a client connect to external prompts, tools, and resources. Add Doctrine as a local MCP server using your client's configuration format:

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

Clients store this configuration in different places, but the `command` and `args` values stay the same. You can also start the server directly:

```bash
npx github:aethrox/doctrine
```

Doctrine registers every `SKILL.md` file as an MCP prompt, which is a template you choose to use. Your client might show these prompts in a menu, expose them through a command, or add its own automation. Installing the MCP server does not mean every skill will activate automatically.

## Manual installation

Clone the repository:

```bash
git clone https://github.com/aethrox/doctrine.git
```

Then copy the skill directories you need into the location your client uses for skills or instructions. If your client reads `~/.claude/skills`, this Bash command copies every Doctrine skill:

```bash
for s in doctrine/skills/*/; do
  name=$(basename "$s")
  cp -r "$s" ~/.claude/skills/"$name"/
done
```

A manual installation will not update itself. When you want a newer version, pull the latest Doctrine changes and copy the files again.

## Verify the installation

1. Invoke `explain-plainly` by its exact name.
2. Ask it to explain the difference between a skill and a tool.
3. Confirm that the answer follows the skill's plain-language discipline.

If the skill does not appear, make sure your client supports the method you chose and recheck the configured path. Some clients only find integrations at startup, so you may also need to restart yours.
