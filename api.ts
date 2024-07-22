import express from "express"
import cors from "cors"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import { applyWSSHandler } from "@trpc/server/adapters/ws"
import ws from "ws";
import { appRouter } from "./routes";

const app = express();
app.use("/trpc", createExpressMiddleware)
app.use(cors({origin: "http://localhost:3000"}))
const server = app.listen(2000, () => {
    console.log("Backend server is running!", 2000);
  });
  

applyWSSHandler({
    wss: new ws.Server({server}),
    router: appRouter
})



