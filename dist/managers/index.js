import { listBrew } from "./brew.js";
import { listCargo } from "./cargo.js";
import { listPath } from "./path.js";
import { listNpm } from "./npm.js";
import { listPip } from "./pip.js";
const PACKAGE_MANAGERS = ["brew", "npm", "cargo", "pip"];
const fetchers = {
    brew: listBrew,
    npm: listNpm,
    cargo: listCargo,
    pip: listPip,
};
/**
 * Fetch installed tools from all managers, then from PATH (excluding names already found).
 */
export async function fetchAllTools(options) {
    const only = options?.onlyManagers;
    const managers = only != null && only.length > 0
        ? [...only]
        : [...PACKAGE_MANAGERS, "path"];
    const packageManagers = managers.filter((m) => m !== "path");
    const results = await Promise.all(packageManagers.map((m) => fetchers[m]()));
    const groups = results.filter((r) => r.tools.length > 0 || r.error != null);
    const tools = results.flatMap((r) => r.tools);
    const knownNames = new Set(tools.map((t) => t.name));
    if (managers.includes("path")) {
        const pathResult = listPath({ excludeNames: knownNames });
        if (pathResult.tools.length > 0) {
            groups.push(pathResult);
            tools.push(...pathResult.tools);
        }
    }
    return { groups, tools };
}
export { listBrew } from "./brew.js";
export { listNpm } from "./npm.js";
export { listCargo } from "./cargo.js";
export { listPip } from "./pip.js";
export { listPath } from "./path.js";
//# sourceMappingURL=index.js.map