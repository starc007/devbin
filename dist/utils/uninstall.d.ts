import type { Tool } from "../types/tool.js";
export interface UninstallResult {
    success: boolean;
    stderr: string;
    stdout: string;
}
/** Path tools cannot be uninstalled via a package manager; returns a clear message. */
export declare function canUninstall(tool: Tool): boolean;
export declare function uninstallTool(tool: Tool): Promise<UninstallResult>;
//# sourceMappingURL=uninstall.d.ts.map