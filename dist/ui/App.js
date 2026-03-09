import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useCallback } from "react";
import { Box, Text, useInput } from "ink";
import { fetchAllTools } from "../managers/index.js";
import { uninstallTool } from "../utils/uninstall.js";
import { Dashboard } from "./Dashboard.js";
import { CategoryList } from "./CategoryList.js";
import { ToolList } from "./ToolList.js";
import { UninstallConfirm } from "./UninstallConfirm.js";
import { Analyze } from "./Analyze.js";
import { Loading } from "./Loading.js";
export function App() {
    const [screen, setScreen] = useState("loading");
    const [groups, setGroups] = useState([]);
    const [tools, setTools] = useState([]);
    /** When on category-detail, which group is open. */
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [listOrUninstallMode, setListOrUninstallMode] = useState("list");
    const [selectedTool, setSelectedTool] = useState(null);
    const [uninstallResult, setUninstallResult] = useState(null);
    const loadTools = useCallback(async () => {
        setScreen("loading");
        const result = await fetchAllTools();
        setGroups(result.groups);
        setTools(result.tools);
        setScreen("dashboard");
    }, []);
    useEffect(() => {
        void loadTools();
    }, [loadTools]);
    useInput((input, key) => {
        if (key.escape || input === "q") {
            if (screen === "dashboard")
                process.exit(0);
            if (screen === "category-list")
                setScreen("dashboard");
            if (screen === "category-detail") {
                setSelectedGroup(null);
                setScreen("category-list");
            }
            if (screen === "uninstall-confirm") {
                setSelectedTool(null);
                setUninstallResult(null);
                setScreen("category-detail");
            }
            if (screen === "analyze")
                setScreen("dashboard");
            return;
        }
        if (screen === "uninstall-confirm" && uninstallResult != null) {
            setSelectedTool(null);
            setUninstallResult(null);
            setScreen("category-detail");
        }
    });
    const handleDashboardSelect = useCallback((action) => {
        switch (action) {
            case "list":
                setListOrUninstallMode("list");
                setScreen("category-list");
                break;
            case "uninstall":
                setListOrUninstallMode("uninstall");
                setScreen("category-list");
                break;
            case "analyze":
                setScreen("analyze");
                break;
            case "refresh":
                void loadTools();
                break;
            case "exit":
                process.exit(0);
        }
    }, [loadTools]);
    const handleCategorySelect = useCallback((value) => {
        if (value.type === "back") {
            setScreen("dashboard");
            return;
        }
        setSelectedGroup(value.group);
        setScreen("category-detail");
    }, []);
    const handleToolListSelect = useCallback((value) => {
        if (value.type === "back") {
            setSelectedGroup(null);
            setScreen("category-list");
            return;
        }
        if (listOrUninstallMode === "uninstall") {
            setSelectedTool(value.tool);
            setUninstallResult(null);
            setScreen("uninstall-confirm");
        }
    }, [listOrUninstallMode]);
    const handleUninstallConfirm = useCallback(async (confirmed) => {
        if (!confirmed || !selectedTool) {
            setSelectedTool(null);
            setScreen("category-detail");
            return;
        }
        const result = await uninstallTool(selectedTool);
        setUninstallResult({
            success: result.success,
            message: result.success ? "Uninstalled successfully." : result.stderr || "Uninstall failed.",
        });
        if (result.success) {
            const next = await fetchAllTools();
            setGroups(next.groups);
            setTools(next.tools);
            const sameGroup = next.groups.find((g) => g.manager === selectedTool.manager);
            setSelectedGroup(sameGroup ?? null);
        }
    }, [selectedTool]);
    if (screen === "loading") {
        return (_jsx(Box, { flexDirection: "column", children: _jsx(Loading, {}) }));
    }
    if (screen === "dashboard") {
        return _jsx(Dashboard, { onSelect: handleDashboardSelect });
    }
    if (screen === "category-list") {
        return (_jsx(Box, { flexDirection: "column", children: _jsx(CategoryList, { groups: groups, mode: listOrUninstallMode, onSelect: handleCategorySelect }) }));
    }
    if (screen === "category-detail" && selectedGroup != null) {
        return (_jsx(Box, { flexDirection: "column", children: _jsx(ToolList, { group: selectedGroup, mode: listOrUninstallMode, onSelect: handleToolListSelect }) }));
    }
    if (screen === "uninstall-confirm" && selectedTool) {
        if (uninstallResult != null) {
            return (_jsxs(Box, { flexDirection: "column", children: [_jsx(Text, { color: uninstallResult.success ? "green" : "red", children: uninstallResult.message }), _jsx(Text, { dimColor: true, children: "Press any key to go back\u2026" })] }));
        }
        return (_jsx(UninstallConfirm, { tool: selectedTool, onConfirm: (ok) => {
                void handleUninstallConfirm(ok);
            } }));
    }
    if (screen === "analyze") {
        return (_jsx(Analyze, { groups: groups, tools: tools, onBack: () => {
                setScreen("dashboard");
            } }));
    }
    return null;
}
//# sourceMappingURL=App.js.map