import { Box, Text } from "ink";
import SelectInput from "ink-select-input";
import type { Tool } from "../types/tool.js";

type Choice = "yes" | "no";

const ITEMS: Array<{ label: string; value: Choice }> = [
  { label: "Yes, uninstall", value: "yes" },
  { label: "No, cancel", value: "no" },
];

interface UninstallConfirmProps {
  tool: Tool;
  onConfirm: (confirmed: boolean) => void;
}

export function UninstallConfirm({ tool, onConfirm }: UninstallConfirmProps) {
  return (
    <Box flexDirection="column">
      <Text color="yellow" bold>
        Uninstall “{tool.name}” ({tool.manager})?
      </Text>
      <Text dimColor>
        This will run: {tool.manager} uninstall {tool.name}
      </Text>
      <Box marginTop={1}>
        <SelectInput
          items={ITEMS}
          onSelect={(item: { value: Choice }) => {
          onConfirm(item.value === "yes");
        }}
        />
      </Box>
    </Box>
  );
}
