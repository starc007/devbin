import { parseBrewList } from "../utils/parser.js";
import { run } from "../utils/run.js";
export async function listBrew() {
    const result = await run("brew", ["list", "--formula"]);
    if (result.exitCode !== 0) {
        return {
            manager: "brew",
            tools: [],
            error: result.stderr || `brew exited with code ${String(result.exitCode)}`,
        };
    }
    const tools = parseBrewList(result.stdout);
    return { manager: "brew", tools };
}
//# sourceMappingURL=brew.js.map