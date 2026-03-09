export interface RunResult {
    readonly stdout: string;
    readonly stderr: string;
    readonly exitCode: number;
}
/**
 * Run a shell command and return stdout/stderr. Does not throw on non-zero exit.
 */
export declare function run(command: string, args: readonly string[], options?: {
    timeout?: number;
}): Promise<RunResult>;
/**
 * Check if a command is available on PATH (e.g. "brew", "cargo").
 */
export declare function isAvailable(command: string): Promise<boolean>;
//# sourceMappingURL=run.d.ts.map