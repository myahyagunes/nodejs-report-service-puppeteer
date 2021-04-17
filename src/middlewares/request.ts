import { Middleware } from "../models/middleware";
import { Logger } from "../server/logging";

export const requestMiddleware: Middleware = async (err, req, _res, next) => {
  Logger.http(`[${req.ip}] [${req.method}] ${req.url}`);
  next(err);
};
