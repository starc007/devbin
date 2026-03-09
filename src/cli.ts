#!/usr/bin/env node

import { render } from "ink";
import React from "react";
import { App } from "./ui/App.js";

async function main() {
  const { waitUntilExit } = render(React.createElement(App));
  await waitUntilExit();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
