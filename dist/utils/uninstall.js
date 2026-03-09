import { run } from "./run.js";
const uninstallCommands = {
    brew: (name) => ({ command: "brew", args: ["uninstall", name] }),
    npm: (name) => ({ command: "npm", args: ["uninstall", "-g", name] }),
    cargo: (name) => ({ command: "cargo", args: ["uninstall", name] }),
    pip: (name) => ({ command: "pip3", args: ["uninstall", "-y", name] }),
};
/** Path tools cannot be uninstalled via a package manager; returns a clear message. */
export function canUninstall(tool) {
    return tool.manager !== "path";
}
export async function uninstallTool(tool) {
    if (tool.manager === "path") {
        return {
            success: false,
            stdout: "",
            stderr: "This tool is not managed by a package manager. Remove the binary manually from your PATH.",
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
//# sourceMappingURL=uninstall.js.map