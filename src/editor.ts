import fs from "fs";
import { promisify } from "util";
import readline from "readline";

const readFile = promisify(fs.readFile);

export default class Editor {
  private cursor: number;

  public static async createForPath(storagePath: string) {
    let content = "";
    try {
      const buffer = await readFile(storagePath);
      content = buffer.toString();
    } catch {}
    return new Editor(storagePath, content);
  }

  constructor(private readonly storagePath: string, private content: string) {
    this.cursor = this.content.length;
  }

  public connect() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on("keypress", (str, key) => {
      if (key.ctrl && key.name === "c") {
        process.exit(0);
      }
      if (str) {
        this.content = this.content + str;
      }
    });
    console.log("awaiting input");
  }

  public getContent() {
    return this.content;
  }

  public getCursor() {
    return this.cursor;
  }
}
