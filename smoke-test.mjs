import { spawn } from "node:child_process";
import assert from "node:assert/strict";

const child = spawn(process.execPath, ["mcp-server.js"], { cwd: import.meta.dirname, stdio: ["pipe", "pipe", "pipe"] });

let buf = "";
child.stdout.on("data", (d) => (buf += d.toString()));

function send(msg) {
  child.stdin.write(JSON.stringify(msg) + "\n");
}

send({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "smoke-test", version: "0" } } });

setTimeout(() => {
  send({ jsonrpc: "2.0", method: "notifications/initialized" });
  send({ jsonrpc: "2.0", id: 2, method: "prompts/list", params: {} });
}, 500);

setTimeout(() => {
  const responses = buf.trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));
  const listResp = responses.find((r) => r.id === 2);
  const prompts = listResp?.result?.prompts ?? [];

  assert.ok(prompts.length >= 28, `expected at least 28 prompts, got ${prompts.length}`);
  assert.ok(prompts.every((p) => p.name && p.description), "every prompt needs a name and description");

  console.log(`ok: ${prompts.length} skills served as MCP prompts`);
  child.kill();
  process.exit(0);
}, 1500);
