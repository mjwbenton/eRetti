import Editor from "./editor";
import fs from "fs";
import { promisify } from "util";

const writeFile = promisify(fs.writeFile);

export default class AutoSave {
  private contentsCache: string;
  constructor(
    private readonly storageFile: string,
    private readonly editor: Editor
  ) {
    this.contentsCache = "";
  }

  public start() {
    setTimeout(async () => {
      const contents = this.editor.getContent();
      if (contents !== this.contentsCache) {
        this.contentsCache = contents;
        await writeFile(this.storageFile, contents);
      }
      this.start();
    }, 2000);
  }
}
