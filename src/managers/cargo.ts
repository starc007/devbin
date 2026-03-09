import type { ManagerResult } from "../types/tool.js";
import { parseCargoList } from "../utils/parser.js";
import { run } from "../utils/run.js";

export async function listCargo(): Promise<ManagerResult> {
  const result = await run("cargo", ["install", "--list"]);
  if (result.exitCode !== 0) {
    return {
      manager: "cargo",
      tools: [],
      error: result.stderr || `cargo exited with code ${result.exitCode}`,
    };
  }
  const tools = parseCargoList(result.stdout);
  return { manager: "cargo", tools };
}
