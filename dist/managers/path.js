import fs from "node:fs";
import path from "node:path";
import process from "node:process";
const SYSTEM_PATH_PREFIXES = ["/bin", "/sbin", "/usr/bin", "/usr/sbin"];
function isSystemPath(dir) {
    const normalized = path.resolve(dir);
    return SYSTEM_PATH_PREFIXES.some((p) => normalized === p || normalized.startsWith(p + path.sep));
}
function isExecutableFile(dir, name) {
    const full = path.join(dir, name);
    try {
        const stat = fs.statSync(full);
        if (!stat.isFile())
            return false;
        const mode = stat.mode;
        return (mode & 0o111) !== 0;
    }
    catch {
        return false;
    }
}
/**
 * List executable names from user PATH directories (excluding system paths).
 * Optionally exclude names already provided by other managers.
 */
export function listPath(options) {
    const pathEnv = process.env.PATH ?? "";
    const exclude = options.excludeNames ?? new Set();
    const seen = new Set();
    const tools = [];
    for (const dir of pathEnv.split(path.delimiter)) {
        const trimmed = dir.trim();
        if (!trimmed || isSystemPath(trimmed))
            continue;
        try {
            const entries = fs.readdirSync(trimmed, { withFileTypes: true });
            for (const ent of entries) {
                if (!ent.isFile())
                    continue;
                const name = ent.name;
                if (exclude.has(name) || seen.has(name))
                    continue;
                if (!isExecutableFile(trimmed, name))
                    continue;
                seen.add(name);
                tools.push({ name, manager: "path" });
            }
        }
        catch {
            // Directory not readable or missing, skip
        }
    }
    return { manager: "path", tools };
}
//# sourceMappingURL=path.js.map