import { Middleware } from "../models/middleware";
import { Logger } from "./../server/logging";

export const errorMiddleware: Middleware = async (err, _req, res, _next) => {
  // winston.error(err.message, err);
  Logger.error(
    `[Name: ${err.name}] [Message: ${err.message}] [Stack: ${err.stack}]`
  );

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send(JSON.stringify(err.message));
};
