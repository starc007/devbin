import { useInput } from "ink";
import { Box, Text } from "ink";
import type { ManagerResult, Tool } from "../types/tool.js";

function findDuplicates(tools: readonly Tool[]): Map<string, Tool[]> {
  const byName = new Map<string, Tool[]>();
  for (const tool of tools) {
    const list = byName.get(tool.name) ?? [];
    list.push(tool);
    byName.set(tool.name, list);
  }
  const duplicates = new Map<string, Tool[]>();
  for (const [name, list] of byName) {
    if (list.length > 1) duplicates.set(name, list);
  }
  return duplicates;
}

interface AnalyzeProps {
  groups: readonly ManagerResult[];
  tools: readonly Tool[];
  onBack: () => void;
}

export function Analyze({ groups, tools, onBack }: AnalyzeProps) {
  useInput(() => {
    onBack();
  });
  const duplicates = findDuplicates(tools);

  return (
    <Box flexDirection="column">
      <Text bold color="cyan">
        System Analysis
      </Text>
      <Text dimColor>{"─".repeat(40)}</Text>

      <Box marginTop={1} flexDirection="column">
        <Text bold>Summary</Text>
        <Text>Total tools: {tools.length}</Text>
        <Text>Managers: {groups.map((g) => g.manager).join(", ")}</Text>
      </Box>

      {duplicates.size > 0 && (
        <Box marginTop={1} flexDirection="column">
          <Text bold color="yellow">Duplicate tools</Text>
          {Array.from(duplicates.entries()).map(([name, list]) => (
            <Text key={name}>
              {name}: installed via {list.map((t) => t.manager).join(", ")}
            </Text>
          ))}
        </Box>
      )}

      {groups.some((g) => g.error) && (
        <Box marginTop={1} flexDirection="column">
          <Text bold color="red">Errors</Text>
          {groups.filter((g) => g.error).map((g) => (
            <Text key={g.manager} color="red">
              {g.manager}: {g.error}
            </Text>
          ))}
        </Box>
      )}

      <Box marginTop={2}>
        <Text dimColor>Press any key to go back...</Text>
      </Box>
    </Box>
  );
}
