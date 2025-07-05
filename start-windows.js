#!/usr/bin/env node
/**
 * Context7 MCP Server for Windows
 * Starts the Context7 documentation server
 */

import { spawn } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverPath = join(__dirname, "dist", "index.js");

console.log("[CONTEXT7] Starting Context7 MCP Server...");
console.log(`[CONTEXT7] Server path: ${serverPath}`);

const server = spawn("node", [serverPath, "--transport", "http"], {
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production" },
});

server.on("error", (error) => {
  console.error(`[CONTEXT7] Error: ${error.message}`);
  process.exit(1);
});

server.on("exit", (code) => {
  console.log(`[CONTEXT7] Server exited with code ${code}`);
  process.exit(code);
});

process.on("SIGINT", () => {
  console.log("[CONTEXT7] Shutting down...");
  server.kill();
  process.exit(0);
});
