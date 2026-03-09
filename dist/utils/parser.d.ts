import type { Tool } from "../types/tool.js";
/**
 * Parse "brew list --formula" output: one formula per line.
 */
export declare function parseBrewList(stdout: string): Tool[];
/**
 * Parse "npm list -g --depth=0" output. Format is "package@version" or just package.
 * First line is often the root project; we want only top-level deps.
 */
export declare function parseNpmList(stdout: string): Tool[];
/**
 * Parse "cargo install --list" output. Format is "toolname v1.2.3:" or "toolname:".
 */
export declare function parseCargoList(stdout: string): Tool[];
/**
 * Parse "pip3 list" output. Format is "package version" with optional header lines.
 */
export declare function parsePipList(stdout: string): Tool[];
//# sourceMappingURL=parser.d.ts.map