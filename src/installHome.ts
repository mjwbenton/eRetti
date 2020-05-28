#!/usr/bin/env node

import fs from "fs";
import { promisify } from "util";
import os from "os";
import path from "path";

const copyFile = promisify(fs.copyFile);

const PROFILE = ".profile";
const HOSTAPD = "hostapd.conf";
const UDHCPD = "udhcpd.conf";
const START_WIFI = "start_wifi.sh";

async function main() {
  await Promise.all(
    [PROFILE, HOSTAPD, UDHCPD, START_WIFI].map(file =>
      copyFile(
        path.join(__dirname, "..", "config", file),
        path.join(os.homedir(), file)
      )
    )
  );
}
main();
