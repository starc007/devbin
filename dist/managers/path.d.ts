import type { ManagerResult } from "../types/tool.js";
/**
 * List executable names from user PATH directories (excluding system paths).
 * Optionally exclude names already provided by other managers.
 */
export declare function listPath(options: {
    excludeNames?: ReadonlySet<string>;
}): ManagerResult;
//# sourceMappingURL=path.d.ts.map