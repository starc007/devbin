#!/usr/bin/env bash
# One-time fix: put devbin on PATH. Run this if "devbin" is not found after install.
# Usage: bash fix-path.sh   (or: curl -fsSL .../fix-path.sh | bash)

set -e

BIN_DIR="$HOME/.local/bin"
# npm config get prefix works in all npm versions; npm bin -g is not always available
NPM_PREFIX="$(npm config get prefix 2>/dev/null | tr -d '\n')"
NPM_BIN="${NPM_PREFIX}/bin"

if [ -z "$NPM_PREFIX" ] || [ ! -d "$NPM_BIN" ]; then
  echo "Error: could not get npm global path. Is Node/npm installed?" >&2
  exit 1
fi

if [ ! -f "${NPM_BIN}/devbin" ]; then
  echo "Error: devbin not found at ${NPM_BIN}/devbin. Run the install script first." >&2
  exit 1
fi

mkdir -p "$BIN_DIR"
# Wrapper script: symlinks to npm's devbin often break (relative paths). Run the real one by path.
cat > "$BIN_DIR/devbin" << 'WRAPPER'
#!/bin/sh
exec "$(npm config get prefix 2>/dev/null | tr -d '\n')/bin/devbin" "$@"
WRAPPER
chmod +x "$BIN_DIR/devbin"

RCFILE="$HOME/.zshrc"
[ -f "$HOME/.bashrc" ] && [ ! -f "$RCFILE" ] && RCFILE="$HOME/.bashrc"
if ! grep -q '\.local/bin' "$RCFILE" 2>/dev/null; then
  echo "" >> "$RCFILE"
  echo "# local bin" >> "$RCFILE"
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$RCFILE"
  echo "Added \$HOME/.local/bin to $RCFILE"
fi

export PATH="$HOME/.local/bin:$PATH"
echo ""
echo "Done. Run:  devbin"
echo ""
exec "$BIN_DIR/devbin"