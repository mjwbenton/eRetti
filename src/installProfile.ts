#!node

import fs from "fs";
import { promisify } from "util";
import os from "os";
import path from "path";

const copyFile = promisify(fs.copyFile);

const SOURCE = path.join(__dirname, "..", "profile");
const DEST = path.join(os.homedir(), ".profile");

async function main() {
  await copyFile(SOURCE, DEST);
}
main();
