import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import type { ManagerResult, Tool } from "../types/tool.js";

type ToolItemValue = { type: "tool"; tool: Tool } | { type: "back" };

interface SelectItem<V> {
  label: string;
  value: V;
  key?: string;
}

function buildItems(groups: readonly ManagerResult[]): SelectItem<ToolItemValue>[] {
  const items: SelectItem<ToolItemValue>[] = [];
  for (const group of groups) {
    for (const tool of group.tools) {
      const version = tool.version ? ` @${tool.version}` : "";
      items.push({
        label: `${group.manager} · ${tool.name}${version}`,
        value: { type: "tool", tool },
        key: `${group.manager}-${tool.name}`,
      });
    }
  }
  items.push({ label: "← Back", value: { type: "back" }, key: "back" });
  return items;
}

interface ToolListProps {
  groups: readonly ManagerResult[];
  mode: "list" | "uninstall";
  onSelect: (value: ToolItemValue) => void;
}

export function ToolList({ groups, mode, onSelect }: ToolListProps) {
  const items = buildItems(groups);

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        Installed CLI Tools
      </Text>
      <Text dimColor>{"─".repeat(40)}</Text>
      <Box marginTop={1}>
        <SelectInput<ToolItemValue>
          items={items}
          onSelect={(item: SelectItem<ToolItemValue>) => {
            onSelect(item.value);
          }}
        />
      </Box>
      {mode === "uninstall" && (
        <Box marginTop={1}>
          <Text dimColor>Select a tool to uninstall, or Back to return.</Text>
        </Box>
      )}
    </Box>
  );
}
