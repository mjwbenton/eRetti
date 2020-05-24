#!/usr/bin/env node

import path from "path";
import Server from "./server";
import Editor from "./editor";
import os from "os";

const STORAGE_FILE = path.join(os.homedir(), "data");

async function main() {
  const editor = await Editor.createForPath(STORAGE_FILE);
  const server = new Server(editor);
  server.connect();
  editor.connect();
}
main();
