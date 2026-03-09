import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Text, Box } from "ink";
import figlet from "figlet";
import { useMemo } from "react";
const FONT = "Standard";
export function Header() {
    const art = useMemo(() => figlet.textSync("DEV BIN", {
        font: FONT,
        horizontalLayout: "default",
        verticalLayout: "default",
    }), []);
    return (_jsxs(Box, { flexDirection: "column", marginBottom: 1, children: [_jsx(Text, { color: "cyan", bold: true, children: art }), _jsx(Text, { dimColor: true, children: "Manage and inspect installed CLI tools" })] }));
}
//# sourceMappingURL=Header.js.map