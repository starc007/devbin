import type { Manager, Tool } from "../types/tool.js";
import { run } from "./run.js";

const uninstallCommands: Record<
  Manager,
  (name: string) => { command: string; args: string[] }
> = {
  brew: (name) => ({ command: "brew", args: ["uninstall", name] }),
  npm: (name) => ({ command: "npm", args: ["uninstall", "-g", name] }),
  cargo: (name) => ({ command: "cargo", args: ["uninstall", name] }),
  pip: (name) => ({ command: "pip3", args: ["uninstall", "-y", name] }),
};

export interface UninstallResult {
  success: boolean;
  stderr: string;
  stdout: string;
}

export async function uninstallTool(tool: Tool): Promise<UninstallResult> {
  const { command, args } = uninstallCommands[tool.manager](tool.name);
  const result = await run(command, args);
  return {
    success: result.exitCode === 0,
    stdout: result.stdout,
    stderr: result.stderr,
  };
}
