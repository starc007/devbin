import { parseNpmList } from "../utils/parser.js";
import { run } from "../utils/run.js";
export async function listNpm() {
    const result = await run("npm", ["list", "-g", "--depth=0"]);
    // npm list -g can exit 1 when there are peer dep issues but still print the list
    const tools = parseNpmList(result.stdout);
    const error = result.exitCode !== 0 && tools.length === 0 ? result.stderr : undefined;
    return { manager: "npm", tools, ...(error !== undefined && { error }) };
}
//# sourceMappingURL=npm.js.map