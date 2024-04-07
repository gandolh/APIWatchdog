import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
router
    .get("/200", (ctx) => {
        ctx.response.status = 200;
        ctx.response.body = "OK";
    })
    .get("/302", (ctx) => {
        ctx.response.status = 302;
        ctx.response.body = "Redirect";
    })
    .get("/404", (ctx) => {
        ctx.response.status = 404;
        ctx.response.body = "Not Found";
    })
    .get("/500", (ctx) => {
        ctx.response.status = 500;
        ctx.response.body = "Internal Server Error";
    });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on http://localhost:3001");
await app.listen({ port: 3001 });