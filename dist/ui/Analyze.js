import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useInput } from "ink";
import { Box, Text } from "ink";
function findDuplicates(tools) {
    const byName = new Map();
    for (const tool of tools) {
        const list = byName.get(tool.name) ?? [];
        list.push(tool);
        byName.set(tool.name, list);
    }
    const duplicates = new Map();
    for (const [name, list] of byName) {
        if (list.length > 1)
            duplicates.set(name, list);
    }
    return duplicates;
}
export function Analyze({ groups, tools, onBack }) {
    useInput(() => {
        onBack();
    });
    const duplicates = findDuplicates(tools);
    return (_jsxs(Box, { flexDirection: "column", children: [_jsx(Text, { bold: true, color: "cyan", children: "System Analysis" }), _jsx(Text, { dimColor: true, children: "─".repeat(40) }), _jsxs(Box, { marginTop: 1, flexDirection: "column", children: [_jsx(Text, { bold: true, children: "Summary" }), _jsxs(Text, { children: ["Total tools: ", tools.length] }), _jsxs(Text, { children: ["Managers: ", groups.map((g) => g.manager).join(", ")] })] }), duplicates.size > 0 && (_jsxs(Box, { marginTop: 1, flexDirection: "column", children: [_jsx(Text, { bold: true, color: "yellow", children: "Duplicate tools" }), Array.from(duplicates.entries()).map(([name, list]) => (_jsxs(Text, { children: [name, ": installed via ", list.map((t) => t.manager).join(", ")] }, name)))] })), groups.some((g) => g.error) && (_jsxs(Box, { marginTop: 1, flexDirection: "column", children: [_jsx(Text, { bold: true, color: "red", children: "Errors" }), groups.filter((g) => g.error).map((g) => (_jsxs(Text, { color: "red", children: [g.manager, ": ", g.error] }, g.manager)))] })), _jsx(Box, { marginTop: 2, children: _jsx(Text, { dimColor: true, children: "Press any key to go back..." }) })] }));
}
//# sourceMappingURL=Analyze.js.map