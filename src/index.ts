#!/usr/bin/env node

import Server from "./server";
import Editor from "./editor";

const STORAGE_FILE = "/mnt/kindlewriter/writing.txt";

async function main() {
  const editor = await Editor.createForPath(STORAGE_FILE);
  const server = new Server(editor);
  server.connect();
  editor.connect();
}
main();
