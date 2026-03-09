#!/usr/bin/env bash
# Uninstall devbin.
# Usage: curl -fsSL https://raw.githubusercontent.com/starc007/devbin/main/uninstall.sh | bash

set -e

echo "> devbin uninstaller"
echo ""

echo "> Removing devbin (npm uninstall -g devbin)..."
if npm uninstall -g devbin 2>/dev/null; then
  echo "  Uninstalled."
else
  echo "  devbin was not installed via npm, or already removed."
fi
echo ""

# Tell user about the PATH line the installer may have added
for RCFILE in "$HOME/.zshrc" "$HOME/.bashrc"; do
  if [ -f "$RCFILE" ] && grep -q "added by devbin installer" "$RCFILE" 2>/dev/null; then
    echo "You may want to remove the npm global bin lines from $RCFILE"
    echo "  (look for: # npm global bin (added by devbin installer)"
    echo ""
  fi
done

echo "Done. devbin has been uninstalled."
