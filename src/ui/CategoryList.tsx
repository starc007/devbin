import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import type { ManagerResult } from "../types/tool.js";

const MANAGER_LABELS: Record<string, string> = {
  brew: "Homebrew",
  npm: "npm",
  cargo: "Cargo",
  pip: "pip",
  path: "PATH / Other",
};

type CategoryValue =
  | { type: "category"; group: ManagerResult }
  | { type: "back" };

interface SelectItem<V> {
  label: string;
  value: V;
  key?: string;
}

function buildItems(
  groups: readonly ManagerResult[]
): SelectItem<CategoryValue>[] {
  const items: SelectItem<CategoryValue>[] = groups.map((group) => ({
    label: `${MANAGER_LABELS[group.manager] ?? group.manager} (${String(
      group.tools.length
    )})`,
    value: { type: "category", group },
    key: group.manager,
  }));
  items.push({ label: "← Back", value: { type: "back" }, key: "back" });
  return items;
}

interface CategoryListProps {
  groups: readonly ManagerResult[];
  mode: "list" | "uninstall";
  onSelect: (value: CategoryValue) => void;
}

export function CategoryList({ groups, mode, onSelect }: CategoryListProps) {
  const items = buildItems(groups);

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        {mode === "list" ? "List Tools" : "Uninstall Tool"}
      </Text>
      <Text dimColor>Select a category, then pick a tool</Text>
      <Text dimColor>{"─".repeat(40)}</Text>
      <Box marginTop={1}>
        <SelectInput<CategoryValue>
          items={items}
          onSelect={(item: SelectItem<CategoryValue>) => {
            onSelect(item.value);
          }}
        />
      </Box>
    </Box>
  );
}
