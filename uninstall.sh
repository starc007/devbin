#!/usr/bin/env bash
# Uninstall devbin.
# Usage: curl -fsSL https://raw.githubusercontent.com/starc007/devbin/main/uninstall.sh | bash

set -e

echo "> devbin uninstaller"
echo ""

# Remove symlink/copy in ~/.local/bin (installer puts devbin here)
if [ -f "$HOME/.local/bin/devbin" ] || [ -L "$HOME/.local/bin/devbin" ]; then
  rm -f "$HOME/.local/bin/devbin"
  echo "Removed $HOME/.local/bin/devbin"
fi
echo ""

echo "> Removing devbin (npm uninstall -g devbin)..."
if npm uninstall -g devbin 2>/dev/null; then
  echo "  Uninstalled."
else
  echo "  devbin was not installed via npm, or already removed."
fi
echo ""

# Tell user about the PATH block the installer may have added
for RCFILE in "$HOME/.zshrc" "$HOME/.bashrc"; do
  if [ -f "$RCFILE" ] && grep -q "devbin (and other local bins)" "$RCFILE" 2>/dev/null; then
    echo "You may want to remove from $RCFILE the block: # devbin (and other local bins)"
    echo "  and the line: export PATH=\"\$HOME/.local/bin:\$PATH\""
    echo ""
  fi
done

echo "Done. devbin has been uninstalled."
