import type { ManagerResult } from "../types/tool.js";
import { parsePipList } from "../utils/parser.js";
import { run } from "../utils/run.js";

export async function listPip(): Promise<ManagerResult> {
  const result = await run("pip3", ["list"]);
  if (result.exitCode !== 0) {
    return {
      manager: "pip",
      tools: [],
      error: result.stderr || `pip3 exited with code ${String(result.exitCode)}`,
    };
  }
  const tools = parsePipList(result.stdout);
  return { manager: "pip", tools };
}
