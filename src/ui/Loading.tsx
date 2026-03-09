import { Box, Text } from "ink";
import Spinner from "ink-spinner";

export function Loading() {
  return (
    <Box>
      <Text color="cyan">
        <Spinner type="dots" />
      </Text>
      <Text> Detecting installed CLI tools…</Text>
    </Box>
  );
}
