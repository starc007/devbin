import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
const MANAGER_LABELS = {
    brew: "Homebrew",
    npm: "npm",
    cargo: "Cargo",
    pip: "pip",
    path: "PATH / Other",
};
function buildItems(group) {
    const items = group.tools.map((tool) => ({
        label: tool.version ? `${tool.name} @${tool.version}` : tool.name,
        value: { type: "tool", tool },
        key: tool.name,
    }));
    items.push({ label: "← Back", value: { type: "back" }, key: "back" });
    return items;
}
export function ToolList({ group, mode, onSelect }) {
    const items = buildItems(group);
    const categoryLabel = MANAGER_LABELS[group.manager] ?? group.manager;
    return (_jsxs(Box, { flexDirection: "column", children: [_jsxs(Text, { bold: true, color: "cyan", children: [categoryLabel, " (", group.tools.length, ")"] }), _jsx(Text, { dimColor: true, children: "─".repeat(40) }), _jsx(Box, { marginTop: 1, children: _jsx(SelectInput, { items: items, onSelect: (item) => {
                        onSelect(item.value);
                    } }) }), mode === "uninstall" && group.manager !== "path" && (_jsx(Box, { marginTop: 1, children: _jsx(Text, { dimColor: true, children: "Select a tool to uninstall, or Back." }) })), mode === "uninstall" && group.manager === "path" && (_jsx(Box, { marginTop: 1, children: _jsx(Text, { dimColor: true, children: "PATH tools cannot be uninstalled here. Remove manually." }) }))] }));
}
//# sourceMappingURL=ToolList.js.map