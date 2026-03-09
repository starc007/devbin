# devbin

**Interactive CLI tool manager for macOS** — discover, manage, and uninstall CLI tools from Homebrew, npm, Cargo, and pip in a single terminal UI.

## Features

- **Detect** installed CLI tools from:
  - Homebrew (`brew list --formula`)
  - npm global (`npm list -g --depth=0`)
  - Cargo (`cargo install --list`)
  - pip (`pip3 list`)
- **Dashboard UI** with keyboard-driven navigation (↑↓ move, Enter select, q quit)
- **List tools** grouped by package manager
- **Uninstall** with confirmation and the correct command per manager
- **Analyze** — summary, duplicate detection, and manager errors
- **Refresh** — reload tool data without restarting

## Install

**One-liner** (installs from GitHub; no npm publish needed; requires Node.js ≥ 18):

```bash
curl -fsSL https://raw.githubusercontent.com/starc007/devbin/main/install.sh | bash
```

The script installs from [github.com/starc007/devbin](https://github.com/starc007/devbin)—the repo is cloned and built on your machine; nothing is published to npm.

**Install from Git directly** (same result, no curl script):

```bash
npm install -g git+https://github.com/starc007/devbin.git
```

## Uninstall

**One-liner:**

```bash
curl -fsSL https://raw.githubusercontent.com/starc007/devbin/main/uninstall.sh | bash
```

**Or manually:**

```bash
npm uninstall -g devbin
```

If the installer added npm’s global bin to your PATH in `~/.zshrc` or `~/.bashrc`, you can remove that block (the comment says “added by devbin installer”).

## Usage

Run from an interactive terminal:

```bash
devbin
```

Then use the menu:

- **List Tools** — browse installed tools by manager
- **Uninstall Tool** — select a tool and confirm to uninstall
- **Analyze System** — view summary and duplicate tools
- **Refresh** — re-detect tools
- **Exit** or press `q` to quit

## Requirements

- Node.js ≥ 18
- macOS (tested on macOS; may work elsewhere if brew/npm/cargo/pip are available)
- Interactive TTY (devbin is not intended for piping or headless use)

## Development

```bash
git clone <repo>
cd devbin
npm install
npm run build
npm run cli    # run with tsx without building
npm start      # run built dist/cli.js
npm run typecheck
npm run lint
```

The `dist/` folder is committed so that `npm install -g git+https://...` works without running a build. After changing source files, run `npm run build` and commit `dist/` so installs get the latest code.

## License

MIT
