import type { Manager, Tool } from "../types/tool.js";
import { run } from "./run.js";

type UninstallableManager = Exclude<Manager, "path">;

const uninstallCommands: Record<
  UninstallableManager,
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

/** Path tools cannot be uninstalled via a package manager; returns a clear message. */
export function canUninstall(tool: Tool): boolean {
  return tool.manager !== "path";
}

export async function uninstallTool(tool: Tool): Promise<UninstallResult> {
  if (tool.manager === "path") {
    return {
      success: false,
      stdout: "",
      stderr:
        "This tool is not managed by a package manager. Remove the binary manually from your PATH.",
    };
  }
  const { command, args } = uninstallCommands[tool.manager](tool.name);
  const result = await run(command, args);
  return {
    success: result.exitCode === 0,
    stdout: result.stdout,
    stderr: result.stderr,
  };
}
