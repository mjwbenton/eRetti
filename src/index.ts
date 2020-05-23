import path from "path";
import Server from "./server";
import Editor from "./editor";

const STORAGE_FILE = path.normalize(path.join(__dirname, "..", "data"));

async function main() {
  const editor = await Editor.createForPath(STORAGE_FILE);
  const server = new Server(editor);
  server.connect();
  editor.connect();
}
main();
