import cors from "cors";
import { Express } from "express";

export const useCors = (app: Express): any => {
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
};
