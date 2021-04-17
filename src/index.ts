import express from "express";
import config from "config";
import { useConfigCheck } from "./middlewares/config";
import { registerRoutes } from "./server/routes/api";
import { useCors } from "./middlewares/cors";
import { Logger } from "./server/logging";
import { useStaticFiles } from "./middlewares/staticFiles";

const app = express();
useCors(app);
useStaticFiles(app);
registerRoutes(app);
useConfigCheck();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  Logger.info(`Listening on port ${port}...`)
);

module.exports = server;
