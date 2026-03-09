import { Text, Box } from "ink";
import figlet from "figlet";
import { useMemo } from "react";

const FONT = "Standard";

export function Header() {
  const art = useMemo(
    () =>
      figlet.textSync("DEV BIN", {
        font: FONT,
        horizontalLayout: "default",
        verticalLayout: "default",
      }),
    []
  );

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Text color="cyan" bold>
        {art}
      </Text>
      <Text dimColor>Manage and inspect installed CLI tools</Text>
    </Box>
  );
}
