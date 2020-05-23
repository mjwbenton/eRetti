import fs from "fs";
import { promisify } from "util";
import readline from "readline";

const readFile = promisify(fs.readFile);

export default class Editor {
  private selection: { start: number; end: number };

  public static async createForPath(storagePath: string) {
    const content = (await readFile(storagePath)).toString();
    return new Editor(storagePath, content);
  }

  constructor(private readonly storagePath: string, private content: string) {
    this.selection = { start: this.content.length, end: this.content.length };
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

  public getSelection() {
    return this.selection;
  }
}
