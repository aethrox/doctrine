import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";

const skillsDir = join(import.meta.dirname, "skills");
const skills = [];

for (const dir of readdirSync(skillsDir)) {
  const relativePath = `skills/${dir}/SKILL.md`;
  const skillPath = join(skillsDir, dir, "SKILL.md");
  let raw;
  try {
    if (!statSync(skillPath).isFile()) continue;
    raw = readFileSync(skillPath, "utf8");
  } catch {
    continue;
  }

  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert.ok(match, `${relativePath}: missing YAML frontmatter`);

  let frontmatter;
  try {
    frontmatter = yaml.load(match[1]);
  } catch (error) {
    assert.fail(`${relativePath}: invalid YAML frontmatter: ${error.message}`);
  }
  skills.push({ name: frontmatter?.name || dir, raw, relativePath });
}

const child = spawn(process.execPath, ["mcp-server.js"], { cwd: import.meta.dirname, stdio: ["pipe", "pipe", "pipe"] });

let buf = "";
const pending = new Map();

child.stdout.on("data", (d) => {
  buf += d.toString();
  const lines = buf.split("\n");
  buf = lines.pop();
  for (const line of lines.filter(Boolean)) {
    const response = JSON.parse(line);
    const waiter = pending.get(response.id);
    if (waiter) {
      pending.delete(response.id);
      waiter(response);
    }
  }
});

function send(msg) {
  child.stdin.write(JSON.stringify(msg) + "\n");
}

function request(id, method, params) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`timed out waiting for ${method}`)), 5000);
    pending.set(id, (response) => {
      clearTimeout(timeout);
      if (response.error) reject(new Error(`${method} failed: ${JSON.stringify(response.error)}`));
      else resolve(response.result);
    });
    send({ jsonrpc: "2.0", id, method, params });
  });
}

try {
  await request(1, "initialize", { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "smoke-test", version: "0" } });
  send({ jsonrpc: "2.0", method: "notifications/initialized" });
  const { prompts = [] } = await request(2, "prompts/list", {});

  assert.deepEqual(
    prompts.map(({ name }) => name).sort(),
    skills.map(({ name }) => name).sort(),
    "listed prompt names must exactly match discovered skills",
  );
  assert.ok(prompts.every((p) => p.name && p.description), "every prompt needs a name and description");

  const skillsByName = new Map(skills.map((skill) => [skill.name, skill]));
  await Promise.all(prompts.map(async ({ name }, index) => {
    const result = await request(index + 3, "prompts/get", { name });
    assert.equal(
      result.messages?.[0]?.content?.text,
      skillsByName.get(name).raw,
      `${skillsByName.get(name).relativePath}: prompts/get content mismatch`,
    );
  }));

  console.log(`ok: ${skills.length} skills YAML-validated, ${prompts.length} listed, ${prompts.length} content-verified`);
} finally {
  child.kill();
}
