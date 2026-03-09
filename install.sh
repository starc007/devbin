#!/usr/bin/env bash
# Install devbin from GitHub (no npm publish required).
# Usage: curl -fsSL https://raw.githubusercontent.com/starc007/devbin/main/install.sh | bash
#
# Optional: DEVBIN_REPO=owner/devbin DEVBIN_REF=main (ref = branch, tag, or commit)

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
if npm install -g "git+${GIT_URL}"; then
  echo ""
  NPM_BIN="$(npm bin -g 2>/dev/null)"
  if command -v devbin >/dev/null 2>&1; then
    echo "Done. Run: devbin"
  elif [ -n "$NPM_BIN" ] && [ -x "${NPM_BIN}/devbin" ]; then
    # Add npm global bin to PATH in shell config so it works like other CLI tools
    if [ -n "${ZSH_VERSION:-}" ] || [ -f "$HOME/.zshrc" ]; then
      RCFILE="$HOME/.zshrc"
    else
      RCFILE="$HOME/.bashrc"
    fi
    PATH_LINE="export PATH=\"\$PATH:${NPM_BIN}\""
    if [ -f "$RCFILE" ] && grep -q "[[:space:]]*export PATH=.*${NPM_BIN}" "$RCFILE" 2>/dev/null; then
      echo "Done. Run in this terminal: source $RCFILE && devbin"
    elif [ -z "${DEVBIN_NO_ADD_PATH:-}" ]; then
      [ -f "$RCFILE" ] || touch "$RCFILE"
      echo "" >> "$RCFILE"
      echo "# npm global bin (added by devbin installer)" >> "$RCFILE"
      echo "$PATH_LINE" >> "$RCFILE"
      echo "Done. Run in this terminal: source $RCFILE && devbin"
      echo "  (or open a new terminal and run: devbin)"
    else
      echo "Done. Run: $NPM_BIN/devbin"
    fi
  else
    echo "Done. Run: devbin"
  fi
else
  echo ""
  echo "Install failed. Make sure the repo exists and DEVBIN_REPO is set (e.g. your-username/devbin)." >&2
  exit 1
fi
