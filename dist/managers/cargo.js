import { parseCargoList } from "../utils/parser.js";
import { run } from "../utils/run.js";
export async function listCargo() {
    const result = await run("cargo", ["install", "--list"]);
    if (result.exitCode !== 0) {
        return {
            manager: "cargo",
            tools: [],
            error: result.stderr || `cargo exited with code ${String(result.exitCode)}`,
        };
    }
    const tools = parseCargoList(result.stdout);
    return { manager: "cargo", tools };
}
//# sourceMappingURL=cargo.js.map