import { execa } from "execa";

export interface RunResult {
  readonly stdout: string;
  readonly stderr: string;
  readonly exitCode: number;
}

/**
 * Run a shell command and return stdout/stderr. Does not throw on non-zero exit.
 */
export async function run(
  command: string,
  args: readonly string[],
  options?: { timeout?: number }
): Promise<RunResult> {
  const timeoutMs = options?.timeout ?? 15_000;
  try {
    const result = await execa(command, [...args], {
      timeout: timeoutMs,
      reject: false,
    });
    return {
      stdout: String(result.stdout ?? ""),
      stderr: String(result.stderr ?? ""),
      exitCode: result.exitCode ?? (result.failed ? 1 : 0),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      stdout: "",
      stderr: message,
      exitCode: 1,
    };
  }
}

/**
 * Check if a command is available on PATH (e.g. "brew", "cargo").
 */
export async function isAvailable(command: string): Promise<boolean> {
  const result = await run("which", [command], { timeout: 2000 });
  return result.exitCode === 0 && result.stdout.trim().length > 0;
}
