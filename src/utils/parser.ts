import type { Manager, Tool } from "../types/tool.js";

/**
 * Parse "brew list --formula" output: one formula per line.
 */
export function parseBrewList(stdout: string): Tool[] {
  const lines = stdout.trim().split("\n").filter(Boolean);
  return lines.map((name) => ({
    name: name.trim(),
    manager: "brew" as Manager,
  }));
}

/**
 * Parse "npm list -g --depth=0" output. Format is "package@version" or just package.
 * First line is often the root project; we want only top-level deps.
 */
export function parseNpmList(stdout: string): Tool[] {
  const lines = stdout.trim().split("\n");
  const tools: Tool[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("npm@") || trimmed === "(empty)")
      continue;
    // npm list format: "├── pkg@1.0.0" or "└── pkg@1.0.0" or just "pkg@1.0.0"
    const match = trimmed.match(/^(?:[├└│─\s]+)?([^@\s]+)(?:@(.+))?$/);
    if (match) {
      const name = match[1];
      if (name && name !== "npm") {
        tools.push({
          name,
          manager: "npm",
          ...(match[2] !== undefined && { version: match[2] }),
        });
      }
    }
  }
  return tools;
}

/**
 * Parse "cargo install --list" output. Format is "toolname v1.2.3:" or "toolname:".
 */
export function parseCargoList(stdout: string): Tool[] {
  const lines = stdout.trim().split("\n");
  const tools: Tool[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^([a-zA-Z0-9_-]+)\s*(?:v([^\s:]+))?\s*:/);
    const name = match?.[1];
    if (name) {
      const version = match[2];
      tools.push({
        name,
        manager: "cargo",
        ...(version !== undefined && { version }),
      });
    }
  }
  return tools;
}

/**
 * Parse "pip3 list" output. Format is "package version" with optional header lines.
 */
export function parsePipList(stdout: string): Tool[] {
  const lines = stdout.trim().split("\n");
  const tools: Tool[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("Package") || trimmed.startsWith("---"))
      continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 1 && parts[0]) {
      const name = parts[0].toLowerCase();
      if (name !== "package") {
        tools.push({
          name,
          manager: "pip",
          ...(parts[1] !== undefined && { version: parts[1] }),
        });
      }
    }
  }
  return tools;
}
