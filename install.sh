#!/usr/bin/env bash
# Install devbin from GitHub (no npm publish required).
#
# Recommended (avoids pipe consuming script):
#   curl -fsSL https://raw.githubusercontent.com/starc007/devbin/main/install.sh -o /tmp/install-devbin.sh && bash /tmp/install-devbin.sh
#
# Or: curl -fsSL .../install.sh | bash  (if "Done" doesn't appear, run: source ~/.zshrc && devbin)
#
# Optional: DEVBIN_REPO=owner/devbin DEVBIN_REF=main

set -e

# GitHub repo (owner/name) and ref (branch, tag, or commit). Override with env.
DEVBIN_REPO="${DEVBIN_REPO:-starc007/devbin}"
DEVBIN_REF="${DEVBIN_REF:-main}"
GIT_URL="https://github.com/${DEVBIN_REPO}.git#${DEVBIN_REF}"

echo "> devbin installer"
echo ""

# Skip install if devbin is already on PATH
if command -v devbin >/dev/null 2>&1; then
  echo "devbin is already installed at $(command -v devbin). Nothing to do."
  exit 0
fi

# Check for Node.js
if ! command -v node >/dev/null 2>&1; then
  echo "Error: Node.js is required. Install it from https://nodejs.org (v18 or later)." >&2
  exit 1
fi

NODE_MAJOR=$(node -e "console.log(process.versions.node.split('.')[0])")
if [ -z "$NODE_MAJOR" ] || [ "$NODE_MAJOR" -lt 18 ] 2>/dev/null; then
  echo "Error: Node.js 18 or later is required. You have $(node -v)." >&2
  exit 1
fi

# Check for npm
if ! command -v npm >/dev/null 2>&1; then
  echo "Error: npm is required. It usually comes with Node.js." >&2
  exit 1
fi

echo "> Installing from GitHub (${DEVBIN_REPO}@${DEVBIN_REF})..."
# Subshell with stdin from /dev/null so git/npm don't consume the rest of the script (curl | bash)
if ( npm install -g "git+${GIT_URL}" ) < /dev/null; then
  echo ""
  NPM_PREFIX="$(npm config get prefix 2>/dev/null | tr -d '\n')"
  NPM_BIN="${NPM_PREFIX}/bin"
  if command -v devbin >/dev/null 2>&1; then
    echo "Done. Run: devbin"
  elif [ -n "$NPM_BIN" ] && [ -f "${NPM_BIN}/devbin" ]; then
    # Put devbin in ~/.local/bin (wrapper script; symlink often breaks with npm global installs)
    BIN_DIR="$HOME/.local/bin"
    mkdir -p "$BIN_DIR"
    cat > "$BIN_DIR/devbin" << 'WRAPPER'
#!/bin/sh
exec "$(npm config get prefix 2>/dev/null | tr -d '\n')/bin/devbin" "$@"
WRAPPER
    chmod +x "$BIN_DIR/devbin"

    if [ -n "${ZSH_VERSION:-}" ] || [ -f "$HOME/.zshrc" ]; then
      RCFILE="$HOME/.zshrc"
    else
      RCFILE="$HOME/.bashrc"
    fi
    PATH_ADD="export PATH=\"\$HOME/.local/bin:\$PATH\""
    if [ -z "${DEVBIN_NO_ADD_PATH:-}" ]; then
      [ -f "$RCFILE" ] || touch "$RCFILE"
      if ! grep -q '.local/bin' "$RCFILE" 2>/dev/null; then
        echo "" >> "$RCFILE"
        echo "# devbin (and other local bins)" >> "$RCFILE"
        echo "$PATH_ADD" >> "$RCFILE"
      fi
    fi
    echo "Done. devbin installed to $BIN_DIR"
    echo ""
    echo "Run in this terminal:  source $RCFILE && devbin"
    echo "Or open a new terminal and run:  devbin"
    echo ""
    if [ -t 0 ]; then
      echo "Starting devbin now..."
      export PATH="$BIN_DIR:$PATH"
      exec "$BIN_DIR/devbin"
    fi
  else
    echo "Done. Run: devbin"
  fi
else
  echo ""
  echo "Install failed. Make sure the repo exists and DEVBIN_REPO is set (e.g. your-username/devbin)." >&2
  exit 1
fi
