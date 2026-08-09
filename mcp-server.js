#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { parseFrontmatter } from "./frontmatter.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const skillsDir = join(__dirname, "skills");
const { version } = JSON.parse(readFileSync(join(__dirname, "package.json"), "utf8"));

const server = new McpServer({ name: "doctrine", version });

let registered = 0;
for (const dir of readdirSync(skillsDir)) {
  const skillPath = join(skillsDir, dir, "SKILL.md");
  let raw;
  try {
    if (!statSync(skillPath).isFile()) continue;
    raw = readFileSync(skillPath, "utf8");
  } catch {
    continue;
  }
  let name;
  let description;
  try {
    ({ name, description } = parseFrontmatter(raw).frontmatter);
  } catch {
    // Keep one malformed skill from preventing the server from starting.
  }
  server.registerPrompt(
    name || dir,
    {
      title: name || dir,
      description: description || `Engineering discipline: ${dir}`,
    },
    async () => ({
      messages: [
        {
          role: "user",
          content: { type: "text", text: raw },
        },
      ],
    }),
  );
  registered++;
}

if (registered === 0) {
  console.error("doctrine-mcp: no skills found under", skillsDir);
  process.exit(1);
}

const transport = new StdioServerTransport();
await server.connect(transport);
console.error(`doctrine-mcp: serving ${registered} skills as MCP prompts`);
