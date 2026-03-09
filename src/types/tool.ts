/**
 * Supported package managers. Used for detection and uninstall commands.
 */
export type Manager = "brew" | "npm" | "cargo" | "pip";

/**
 * Canonical representation of an installed CLI tool.
 */
export interface Tool {
  /** Display name of the tool (e.g. "ripgrep", "typescript") */
  readonly name: string;
  /** Package manager that installed it */
  readonly manager: Manager;
  /** Optional version string when available from list output */
  readonly version?: string | undefined;
}

/**
 * Group of tools by manager for display.
 */
export interface ToolGroup {
  readonly manager: Manager;
  readonly tools: readonly Tool[];
}

/**
 * Result of fetching tools from a single manager (allows partial failure).
 */
export interface ManagerResult {
  readonly manager: Manager;
  readonly tools: readonly Tool[];
  readonly error?: string | undefined;
}
