import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import type { ManagerResult, Tool } from "../types/tool.js";

const MANAGER_LABELS: Record<string, string> = {
  brew: "Homebrew",
  npm: "npm",
  cargo: "Cargo",
  pip: "pip",
  path: "PATH / Other",
};

type ToolItemValue = { type: "tool"; tool: Tool } | { type: "back" };

interface SelectItem<V> {
  label: string;
  value: V;
  key?: string;
}

function buildItems(group: ManagerResult): SelectItem<ToolItemValue>[] {
  const items: SelectItem<ToolItemValue>[] = group.tools.map((tool) => ({
    label: tool.version ? `${tool.name} @${tool.version}` : tool.name,
    value: { type: "tool", tool },
    key: tool.name,
  }));
  items.push({ label: "← Back", value: { type: "back" }, key: "back" });
  return items;
}

interface ToolListProps {
  /** Single group (one category opened). */
  group: ManagerResult;
  mode: "list" | "uninstall";
  onSelect: (value: ToolItemValue) => void;
}

export function ToolList({ group, mode, onSelect }: ToolListProps) {
  const items = buildItems(group);
  const categoryLabel = MANAGER_LABELS[group.manager] ?? group.manager;

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        {categoryLabel} ({group.tools.length})
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
      {mode === "uninstall" && group.manager !== "path" && (
        <Box marginTop={1}>
          <Text dimColor>Select a tool to uninstall, or Back.</Text>
        </Box>
      )}
      {mode === "uninstall" && group.manager === "path" && (
        <Box marginTop={1}>
          <Text dimColor>PATH tools cannot be uninstalled here. Remove manually.</Text>
        </Box>
      )}
    </Box>
  );
}
