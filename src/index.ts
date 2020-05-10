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
  context.set("Content-Type", "text/html");
  await context.render("read.html");
});
httpRouter.get("/read", async (context: any) => {
  const data = JSON.parse((await readFile(STORAGE_FILE)).toString());
  context.set("Content-Type", "application/json");
  context.body = data;
});
httpRouter.get("/writer", async (context: any) => {
  const data = JSON.parse((await readFile(STORAGE_FILE)).toString());
  console.log(data);
  context.set("Content-Type", "text/html");
  await context.render("write.html", data);
});
httpRouter.post("/write", async context => {
  await writeFile(STORAGE_FILE, context.request.rawBody);
  context.body = "";
});

app
  .use(bodyParser({ enableTypes: ["json", "text"] }))
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
