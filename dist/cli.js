#!/usr/bin/env node
import process from "node:process";
import { render } from "ink";
import React from "react";
import { App } from "./ui/App.js";
async function main() {
    if (!process.stdin.isTTY) {
        process.stderr.write("devbin requires an interactive terminal (TTY). Run it directly from your shell.\n");
        process.exit(1);
    }
    const { waitUntilExit } = render(React.createElement(App));
    await waitUntilExit();
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=cli.js.map