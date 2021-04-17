import { NextFunction, Request, Response } from "express";

export type Middleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => any;
