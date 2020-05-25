#!/usr/bin/env node

import Server from "./server";
import Editor from "./editor";
import AutoSave from "./autoSave";

const STORAGE_FILE =
  process.env.OVERRIDE_FILE || "/mnt/kindlewriter/writing.txt";

async function main() {
  const editor = await Editor.createForPath(STORAGE_FILE);
  const server = new Server(editor);
  const autoSave = new AutoSave(STORAGE_FILE, editor);
  server.start();
  editor.start();
  autoSave.start();
}
main();
