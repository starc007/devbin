import type { Manager, ManagerResult, Tool } from "../types/tool.js";
import { listBrew } from "./brew.js";
import { listCargo } from "./cargo.js";
import { listNpm } from "./npm.js";
import { listPip } from "./pip.js";

const fetchers: Record<Manager, () => Promise<ManagerResult>> = {
  brew: listBrew,
  npm: listNpm,
  cargo: listCargo,
  pip: listPip,
};

/**
 * Fetch installed tools from all managers in parallel.
 * Only runs fetchers for managers that are available (which/brew etc.).
 */
export async function fetchAllTools(
  options?: { onlyManagers?: readonly Manager[] }
): Promise<{ groups: ManagerResult[]; tools: Tool[] }> {
  const only = options?.onlyManagers;
  const managers: Manager[] =
    only != null && only.length > 0 ? [...only] : (["brew", "npm", "cargo", "pip"] as const);

  const results = await Promise.all(managers.map((m) => fetchers[m]()));
  const groups = results.filter((r) => r.tools.length > 0 || r.error != null);
  const tools = results.flatMap((r) => r.tools);
  return { groups, tools };
}

export { listBrew } from "./brew.js";
export { listNpm } from "./npm.js";
export { listCargo } from "./cargo.js";
export { listPip } from "./pip.js";
