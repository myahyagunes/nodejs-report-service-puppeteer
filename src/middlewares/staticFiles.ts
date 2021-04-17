import express, { Express } from "express";
import path from "path";

export const useStaticFiles = (app: Express): any => {
  // Logger.warn(path.resolve("src/content/public"));
  app.use("/public", express.static(path.resolve("src/content")));
};
