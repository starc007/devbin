import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
const ITEMS = [
    { label: "Yes, uninstall", value: "yes" },
    { label: "No, cancel", value: "no" },
];
export function UninstallConfirm({ tool, onConfirm }) {
    return (_jsxs(Box, { flexDirection: "column", children: [_jsxs(Text, { color: "yellow", bold: true, children: ["Uninstall \u201C", tool.name, "\u201D (", tool.manager, ")?"] }), _jsxs(Text, { dimColor: true, children: ["This will run: ", tool.manager, " uninstall ", tool.name] }), _jsx(Box, { marginTop: 1, children: _jsx(SelectInput, { items: ITEMS, onSelect: (item) => {
                        onConfirm(item.value === "yes");
                    } }) })] }));
}
//# sourceMappingURL=UninstallConfirm.js.map