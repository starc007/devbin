import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import { Header } from "./Header.js";

export type DashboardAction =
  | "list"
  | "uninstall"
  | "analyze"
  | "refresh"
  | "exit";

interface SelectItem<V> {
  label: string;
  value: V;
  key?: string;
}

const ITEMS: SelectItem<DashboardAction>[] = [
  { label: "List Tools", value: "list" },
  { label: "Uninstall Tool", value: "uninstall" },
  { label: "Analyze System", value: "analyze" },
  { label: "Refresh", value: "refresh" },
  { label: "Exit", value: "exit" },
];

interface DashboardProps {
  onSelect: (action: DashboardAction) => void;
}

export function Dashboard({ onSelect }: DashboardProps) {
  return (
    <Box flexDirection="column">
      <Header />
      <Box marginTop={1}>
        <SelectInput<DashboardAction>
          items={ITEMS}
          onSelect={(item: SelectItem<DashboardAction>) => {
            onSelect(item.value);
          }}
        />
      </Box>
      <Box marginTop={2}>
        <Text dimColor>↑ ↓ move · enter select · q quit</Text>
      </Box>
    </Box>
  );
}
