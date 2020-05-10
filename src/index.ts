import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import views from "koa-views";
import fs from "fs";
import { promisify } from "util";
import path from "path";

const STORAGE_FILE = path.normalize(path.join(__dirname, "..", "data"));

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const app = new Koa();
const httpRouter = new Router();

httpRouter.get("/reader", async (context: any) => {
  const content = await readFile(STORAGE_FILE);
  context.set("Content-Type", "text/html");
  await context.render("read.html", { content });
});
httpRouter.get("/read", async (context: any) => {
  context.set("Content-Type", "text/plain");
  context.body = await readFile(STORAGE_FILE);
});
httpRouter.get("/writer", async (context: any) => {
  const content = await readFile(STORAGE_FILE);
  context.set("Content-Type", "text/html");
  await context.render("write.html", { content });
});
httpRouter.post("/write", async context => {
  await writeFile(STORAGE_FILE, context.request.rawBody || "");
  context.body = "";
});

app
  .use(bodyParser({ enableTypes: ["text"] }))
  .use(
    views(__dirname + "/views", {
      map: {
        html: "handlebars"
      }
    })
  )
  .use(httpRouter.routes())
  .use(httpRouter.allowedMethods());
app.listen(8000);

console.log("Listening on 8000");
