import { useEffect, useState, useCallback } from "react";
import { Box, Text, useInput } from "ink";
import type { ManagerResult, Tool } from "../types/tool.js";
import { fetchAllTools } from "../managers/index.js";
import { uninstallTool } from "../utils/uninstall.js";
import { Dashboard, type DashboardAction } from "./Dashboard.js";
import { ToolList } from "./ToolList.js";
import { UninstallConfirm } from "./UninstallConfirm.js";
import { Analyze } from "./Analyze.js";
import { Loading } from "./Loading.js";

type Screen =
  | "dashboard"
  | "list"
  | "uninstall"
  | "uninstall-confirm"
  | "analyze"
  | "loading";

export function App() {
  const [screen, setScreen] = useState<Screen>("loading");
  const [groups, setGroups] = useState<ManagerResult[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [uninstallResult, setUninstallResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

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
      if (screen === "dashboard") process.exit(0);
      if (screen === "list" || screen === "uninstall") setScreen("dashboard");
      if (screen === "uninstall-confirm") {
        setSelectedTool(null);
        setUninstallResult(null);
        setScreen("uninstall");
      }
      if (screen === "analyze") setScreen("dashboard");
      return;
    }
    if (screen === "uninstall-confirm" && uninstallResult != null) {
      setSelectedTool(null);
      setUninstallResult(null);
      setScreen("uninstall");
    }
  });

  const handleDashboardSelect = useCallback(
    (action: DashboardAction) => {
      switch (action) {
        case "list":
          setScreen("list");
          break;
        case "uninstall":
          setScreen("uninstall");
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
    },
    [loadTools]
  );

  const handleToolListSelect = useCallback(
    (value: { type: "tool"; tool: Tool } | { type: "back" }) => {
      if (value.type === "back") {
        setScreen("dashboard");
        return;
      }
      if (screen === "uninstall") {
        setSelectedTool(value.tool);
        setUninstallResult(null);
        setScreen("uninstall-confirm");
      }
    },
    [screen]
  );

  const handleUninstallConfirm = useCallback(async (confirmed: boolean) => {
    if (!confirmed || !selectedTool) {
      setSelectedTool(null);
      setScreen("uninstall");
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
    }
  }, [selectedTool]);

  if (screen === "loading") {
    return (
      <Box flexDirection="column">
        <Loading />
      </Box>
    );
  }

  if (screen === "dashboard") {
    return <Dashboard onSelect={handleDashboardSelect} />;
  }

  if (screen === "list" || screen === "uninstall") {
    return (
      <Box flexDirection="column">
        <ToolList
          groups={groups}
          mode={screen === "list" ? "list" : "uninstall"}
          onSelect={handleToolListSelect}
        />
      </Box>
    );
  }

  if (screen === "uninstall-confirm" && selectedTool) {
    if (uninstallResult != null) {
      return (
        <Box flexDirection="column">
          <Text color={uninstallResult.success ? "green" : "red"}>
            {uninstallResult.message}
          </Text>
          <Text dimColor>Press any key to go back…</Text>
        </Box>
      );
    }
    return (
      <UninstallConfirm
        tool={selectedTool}
        onConfirm={(ok) => {
          void handleUninstallConfirm(ok);
        }}
      />
    );
  }

  if (screen === "analyze") {
    return (
      <Analyze
        groups={groups}
        tools={tools}
        onBack={() => {
          setScreen("dashboard");
        }}
      />
    );
  }

  return null;
}
