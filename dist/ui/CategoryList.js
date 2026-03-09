import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
const MANAGER_LABELS = {
    brew: "Homebrew",
    npm: "npm",
    cargo: "Cargo",
    pip: "pip",
    path: "PATH / Other",
};
function buildItems(groups) {
    const items = groups.map((group) => ({
        label: `${MANAGER_LABELS[group.manager] ?? group.manager} (${String(group.tools.length)})`,
        value: { type: "category", group },
        key: group.manager,
    }));
    items.push({ label: "← Back", value: { type: "back" }, key: "back" });
    return items;
}
export function CategoryList({ groups, mode, onSelect }) {
    const items = buildItems(groups);
    return (_jsxs(Box, { flexDirection: "column", children: [_jsx(Text, { bold: true, color: "cyan", children: mode === "list" ? "List Tools" : "Uninstall Tool" }), _jsx(Text, { dimColor: true, children: "Select a category, then pick a tool" }), _jsx(Text, { dimColor: true, children: "─".repeat(40) }), _jsx(Box, { marginTop: 1, children: _jsx(SelectInput, { items: items, onSelect: (item) => {
                        onSelect(item.value);
                    } }) })] }));
}
//# sourceMappingURL=CategoryList.js.map