import Koa from "koa";
import Router from "koa-router";
import views from "koa-views";
import Editor from "./editor";

export default class Server {
  private readonly app: Koa;

  constructor(private readonly editor: Editor) {
    this.app = new Koa();
    const httpRouter = new Router();

    httpRouter.get("/", async (context: any) => {
      context.set("Content-Type", "text/html");
      await context.render("read.html");
    });
    httpRouter.get("/read", async (context: any) => {
      const content = this.editor.getContent();
      const selection = this.editor.getSelection();
      context.set("Content-Type", "application/json");
      context.body = {
        content,
        selection
      };
    });

    this.app
      .use(
        views(__dirname + "/views", {
          map: {
            html: "handlebars"
          }
        })
      )
      .use(httpRouter.routes())
      .use(httpRouter.allowedMethods());
  }

  public connect() {
    this.app.listen(8000);
    console.log("Listening on 8000");
  }
}
