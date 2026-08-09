import { execFileSync, spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";

const repoRoot = import.meta.dirname;
const workDir = mkdtempSync(join(tmpdir(), "doctrine-pack-test-"));

// Prefer invoking npm's own CLI script through this same Node binary (no shell
// needed, works identically everywhere). Falls back to shelling out to the
// npm executable when not run via an npm script (npm_execpath unset).
const npmExecPath = process.env.npm_execpath;
const npmCmd = npmExecPath ? process.execPath : "npm";
const npmArgs = (args) => (npmExecPath ? [npmExecPath, ...args] : args);
const execOpts = { encoding: "utf8", shell: !npmExecPath && process.platform === "win32" };

try {
  const packOut = execFileSync(npmCmd, npmArgs(["pack", "--json", "--pack-destination", workDir]), { cwd: repoRoot, ...execOpts });
  const [{ filename, files }] = JSON.parse(packOut);
  const packedPaths = files.map((f) => f.path);
  assert.ok(packedPaths.includes("frontmatter.mjs"), "frontmatter.mjs must be included in the npm package (check package.json#files)");

  const tarballPath = join(workDir, filename);
  const installDir = join(workDir, "install");
  execFileSync(npmCmd, npmArgs(["install", "--prefix", installDir, "--no-save", tarballPath]), execOpts);

  const serverPath = join(installDir, "node_modules", "doctrine-mcp", "mcp-server.js");
  const child = spawn(process.execPath, [serverPath], { stdio: ["pipe", "pipe", "pipe"] });
  let stderr = "";
  child.stderr.on("data", (d) => (stderr += d.toString()));

  let buf = "";
  const pending = new Map();
  child.stdout.on("data", (d) => {
    buf += d.toString();
    const lines = buf.split("\n");
    buf = lines.pop();
    for (const line of lines.filter(Boolean)) {
      const response = JSON.parse(line);
      pending.get(response.id)?.(response);
      pending.delete(response.id);
    }
  });

  function request(id, method, params) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error(`packaged server did not respond to ${method} in time (likely ERR_MODULE_NOT_FOUND). stderr: ${stderr}`)), 8000);
      pending.set(id, (response) => {
        clearTimeout(timeout);
        if (response.error) reject(new Error(`${method} failed: ${JSON.stringify(response.error)}`));
        else resolve(response.result);
      });
      child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
    });
  }

  let prompts;
  try {
    await request(1, "initialize", { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "pack-test", version: "0" } });
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n");
    ({ prompts } = await request(2, "prompts/list", {}));
  } finally {
    child.kill();
  }

  assert.equal(prompts.length, 33, `expected 33 prompts from packaged server, got ${prompts.length}`);
  const fallback = prompts.filter((p) => p.description.startsWith("Engineering discipline:"));
  assert.equal(fallback.length, 0, `packaged server fell back to generic descriptions for ${fallback.length} skills, frontmatter decoding is broken in the packaged artifact`);

  console.log(`ok: npm package includes frontmatter.mjs, installs cleanly, and serves ${prompts.length} decoded prompts from the packaged artifact`);
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
