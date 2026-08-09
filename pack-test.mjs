import { execFileSync, spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";

const repoRoot = import.meta.dirname;
const workDir = mkdtempSync(join(tmpdir(), "doctrine-pack-test-"));
const npmBin = "npm";
const execOpts = { encoding: "utf8", shell: process.platform === "win32" };

try {
  const packOut = execFileSync(npmBin, ["pack", "--json", "--pack-destination", workDir], { cwd: repoRoot, ...execOpts });
  const [{ filename, files }] = JSON.parse(packOut);
  const packedPaths = files.map((f) => f.path);
  assert.ok(packedPaths.includes("frontmatter.mjs"), "frontmatter.mjs must be included in the npm package (check package.json#files)");

  const tarballPath = join(workDir, filename);
  const installDir = join(workDir, "install");
  execFileSync(npmBin, ["install", "--prefix", installDir, "--no-save", tarballPath], execOpts);

  const serverPath = join(installDir, "node_modules", "doctrine-mcp", "mcp-server.js");

  const prompts = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [serverPath], { stdio: ["pipe", "pipe", "pipe"] });
    let buf = "";
    let stderr = "";
    child.stdout.on("data", (d) => (buf += d.toString()));
    child.stderr.on("data", (d) => (stderr += d.toString()));
    child.on("error", reject);

    const timeout = setTimeout(() => {
      child.kill();
      reject(new Error(`packaged server did not respond in time (likely ERR_MODULE_NOT_FOUND). stderr: ${stderr}`));
    }, 5000);

    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "pack-test", version: "0" } } }) + "\n");
    setTimeout(() => {
      child.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n");
      child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: 2, method: "prompts/list", params: {} }) + "\n");
    }, 500);

    setTimeout(() => {
      clearTimeout(timeout);
      child.kill();
      const lines = buf.trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));
      const listResp = lines.find((r) => r.id === 2);
      if (!listResp?.result?.prompts) reject(new Error(`packaged server gave no prompts/list result. stderr: ${stderr}`));
      else resolve(listResp.result.prompts);
    }, 1500);
  });

  assert.equal(prompts.length, 33, `expected 33 prompts from packaged server, got ${prompts.length}`);
  const fallback = prompts.filter((p) => p.description.startsWith("Engineering discipline:"));
  assert.equal(fallback.length, 0, `packaged server fell back to generic descriptions for ${fallback.length} skills, frontmatter decoding is broken in the packaged artifact`);

  console.log(`ok: npm package includes frontmatter.mjs, installs cleanly, and serves ${prompts.length} decoded prompts from the packaged artifact`);
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
