import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import { Header } from "./Header.js";
const ITEMS = [
    { label: "List Tools", value: "list" },
    { label: "Uninstall Tool", value: "uninstall" },
    { label: "Analyze System", value: "analyze" },
    { label: "Refresh", value: "refresh" },
    { label: "Exit", value: "exit" },
];
export function Dashboard({ onSelect }) {
    return (_jsxs(Box, { flexDirection: "column", children: [_jsx(Header, {}), _jsx(Box, { marginTop: 1, children: _jsx(SelectInput, { items: ITEMS, onSelect: (item) => {
                        onSelect(item.value);
                    } }) }), _jsx(Box, { marginTop: 2, children: _jsx(Text, { dimColor: true, children: "\u2191 \u2193 move \u00B7 enter select \u00B7 q quit" }) })] }));
}
//# sourceMappingURL=Dashboard.js.map