import type { Manager, ManagerResult, Tool } from "../types/tool.js";
/**
 * Fetch installed tools from all managers, then from PATH (excluding names already found).
 */
export declare function fetchAllTools(options?: {
    onlyManagers?: readonly Manager[];
}): Promise<{
    groups: ManagerResult[];
    tools: Tool[];
}>;
export { listBrew } from "./brew.js";
export { listNpm } from "./npm.js";
export { listCargo } from "./cargo.js";
export { listPip } from "./pip.js";
export { listPath } from "./path.js";
//# sourceMappingURL=index.d.ts.map