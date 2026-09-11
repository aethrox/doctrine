import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { parseFrontmatter } from "./frontmatter.mjs";
import { discoverSkillNames } from "./skill-set.mjs";

const skillsDir = join(import.meta.dirname, "skills");
const skills = [];

function validateFrontmatter(raw, relativePath, dir) {
  let frontmatter;
  try {
    ({ frontmatter } = parseFrontmatter(raw));
  } catch (error) {
    assert.fail(`${relativePath}: invalid YAML frontmatter: ${error.message}`);
  }
  assert.ok(frontmatter && Object.getPrototypeOf(frontmatter) === Object.prototype, `${relativePath}: YAML frontmatter must be a mapping`);
  assert.ok(typeof frontmatter.name === "string" && frontmatter.name.trim(), `${relativePath}: frontmatter name must be a non-empty string`);
  assert.ok(typeof frontmatter.description === "string" && frontmatter.description.trim(), `${relativePath}: frontmatter description must be a non-empty string`);
  assert.equal(frontmatter.name, dir, `${relativePath}: frontmatter name must match directory name ${dir}`);
  return frontmatter;
}

const lf = '---\nname: example\ndescription: "Uses an \\"inner\\" quote"\n---\nBody\n';
const crlf = lf.replaceAll("\n", "\r\n");
assert.deepEqual(parseFrontmatter(crlf).frontmatter, parseFrontmatter(lf).frontmatter, "CRLF frontmatter must parse the same as LF frontmatter");
assert.equal(parseFrontmatter(lf).frontmatter.description, 'Uses an "inner" quote', "quoted YAML descriptions must be decoded");
assert.throws(() => validateFrontmatter("---\ndescription: Missing name\n---\n", "synthetic/SKILL.md", "synthetic"), /name must be a non-empty string/);
assert.throws(() => validateFrontmatter("---\nname: synthetic\n---\n", "synthetic/SKILL.md", "synthetic"), /description must be a non-empty string/);

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

  const { name, description } = validateFrontmatter(raw, relativePath, dir);
  skills.push({ name, description, raw, relativePath });
}

const catalogRelativePath = "website/src/components/SkillCatalog.astro";
const catalog = readFileSync(join(import.meta.dirname, ...catalogRelativePath.split("/")), "utf8");

// Each literal ends at the next line opening with "}" at column 0, because the two
// do not close alike: categories ends "};" and turkishSkillDescriptions "} as const;".
function objectBlock(declaration) {
  const start = catalog.indexOf(declaration);
  assert.notEqual(start, -1, `${catalogRelativePath}: could not find "${declaration}"`);
  const end = catalog.indexOf("\n}", start + declaration.length);
  assert.notEqual(end, -1, `${catalogRelativePath}: "${declaration}" is not closed at column 0`);
  return catalog.slice(start, end);
}

const skillNames = skills.map(({ name }) => name).sort();
// Category keys are capitalised and contain spaces, so only skill names match here.
const categorised = [...objectBlock("const categories = {").matchAll(/'([a-z][a-z0-9-]*)'/g)].map(([, name]) => name).sort();
// One entry per line, and anchoring matters: the Turkish values contain escaped apostrophes.
const translated = [...objectBlock("const turkishSkillDescriptions = {").matchAll(/^\s*'([a-z][a-z0-9-]*)':/gm)].map(([, name]) => name).sort();

assert.deepEqual(discoverSkillNames(skillsDir), skillNames, "every skills/ directory with a SKILL.md must be discovered");
assert.deepEqual(categorised, skillNames, `${catalogRelativePath}: every skill must appear in exactly one category`);
assert.deepEqual(translated, skillNames, `${catalogRelativePath}: every skill must have a Turkish description`);

// Category keys sit at one tab; the nested label/description keys are unquoted, so they do not match.
const categoryKeys = (declaration) => [...objectBlock(declaration).matchAll(/^\t'([^']+)':/gm)].map(([, key]) => key).sort();
const declaredCategories = categoryKeys("const categories = {");
assert.deepEqual(categoryKeys("const categoryDescriptions = {"), declaredCategories, `${catalogRelativePath}: every category needs an English description`);
assert.deepEqual(categoryKeys("const turkishCategories = {"), declaredCategories, `${catalogRelativePath}: every category needs a Turkish label and description`);

const readRepoFile = (relativePath) => readFileSync(join(import.meta.dirname, ...relativePath.split("/")), "utf8");

// This array is what the Claude Code plugin actually installs, so a gap here ships missing skills.
const pluginRelativePath = ".claude-plugin/plugin.json";
const pluginSkills = (JSON.parse(readRepoFile(pluginRelativePath)).skills ?? []).map((entry) => entry.replace(/^\.\/skills\//, ""));
assert.deepEqual([...pluginSkills].sort(), skillNames, `${pluginRelativePath}: the skills array must list every skill`);
assert.deepEqual(pluginSkills, [...pluginSkills].sort(), `${pluginRelativePath}: keep the skills array alphabetically sorted`);

for (const relativePath of ["README.md", "WORKFLOW.md", ".claude-plugin/marketplace.json"]) {
  for (const [match, count] of readRepoFile(relativePath).matchAll(/(\d+) skills/g)) {
    assert.equal(Number(count), skillNames.length, `${relativePath}: "${match}" is stale, there are ${skillNames.length}`);
  }
}

// WORKFLOW.md says its map was extracted from the skill sources, so hold it to that.
const workflow = readRepoFile("WORKFLOW.md");
const skillNameSet = new Set(skillNames);
const referenced = new Map();
for (const skill of skills) {
  const names = [...new Set([...skill.raw.matchAll(/`([a-z][a-z0-9-]*)`/g)].map(([, name]) => name))]
    .filter((name) => skillNameSet.has(name) && name !== skill.name)
    .sort();
  if (names.length) referenced.set(skill.name, names);
}
const tabulated = new Map([...workflow.slice(workflow.indexOf("## Full cross-reference map")).matchAll(/^\| `([a-z][a-z0-9-]*)` \| (.+?) \|$/gm)]
  .map(([, name, cell]) => [name, [...cell.matchAll(/`([a-z][a-z0-9-]*)`/g)].map(([, ref]) => ref).sort()]));
assert.deepEqual(Object.fromEntries(tabulated), Object.fromEntries(referenced), "WORKFLOW.md: the cross-reference map must match the references in the skill sources");

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
  const promptsByName = new Map(prompts.map((prompt) => [prompt.name, prompt]));
  for (const skill of skills) {
    const prompt = promptsByName.get(skill.name);
    assert.equal(prompt?.name, skill.name, `${skill.relativePath}: prompts/list name mismatch`);
    assert.equal(prompt?.description, skill.description, `${skill.relativePath}: prompts/list description mismatch`);
  }

  const skillsByName = new Map(skills.map((skill) => [skill.name, skill]));
  await Promise.all(prompts.map(async ({ name }, index) => {
    const result = await request(index + 3, "prompts/get", { name });
    assert.equal(
      result.messages?.[0]?.content?.text,
      skillsByName.get(name).raw,
      `${skillsByName.get(name).relativePath}: prompts/get content mismatch`,
    );
  }));

  console.log(`ok: 4 frontmatter regressions passed, ${skills.length} skills YAML-validated, ${prompts.length} listed, ${prompts.length} content-verified`);
} finally {
  child.kill();
}
