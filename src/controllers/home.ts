import { Handler } from "../models/route";
export const home: Handler = (_req, res, _next) => {
  // return next(
  //   new Error("This is an error and it should be logged to the console")
  // );
  throw new Error("cancelled");

  res.send("Hello world");
};
