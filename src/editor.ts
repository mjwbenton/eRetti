import fs from "fs";
import { promisify } from "util";
import readline from "readline";
import KeyProcessor from "./KeyProcessor";
import QuitProcessor from "./keys/QuitProcessor";
import BackspaceProcessor from "./keys/BackspaceProcessor";
import CharacterProcessor from "./keys/CharacterProcessor";
import MoveProcessor from "./keys/MoveProcessor";
import ReturnProcessor from "./keys/ReturnProcessor";

const readFile = promisify(fs.readFile);

export default class Editor {
  private cursor: number;

  public static async createForPath(storagePath: string) {
    let content = "";
    try {
      const buffer = await readFile(storagePath);
      content = buffer.toString();
    } catch {}
    return new Editor(storagePath, content, [
      QuitProcessor,
      BackspaceProcessor,
      MoveProcessor,
      ReturnProcessor,
      CharacterProcessor
    ]);
  }

  constructor(
    private readonly storagePath: string,
    private content: string,
    private readonly keyProcessors: Array<KeyProcessor>
  ) {
    this.cursor = this.content.length;
  }

  public start() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on("keypress", (_, key) => {
      for (const processor of this.keyProcessors) {
        const result = processor.handle(key, this.content, this.cursor);
        if (result.handled) {
          this.content = result.content;
          this.cursor = result.cursor;
          break;
        }
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
