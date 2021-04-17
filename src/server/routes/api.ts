import express, { Express } from "express";
import { home } from "../../controllers/home";
import { Route } from "../../models/route";
import reportRoutes from "./report";
import { errorMiddleware } from "./../../middlewares/error";
import { requestMiddleware } from "../../middlewares/request";

const routes: Route[] = [
  {
    method: "get",
    path: "/",
    middleware: [],
    handler: home,
  },
  ...reportRoutes,
];

export const registerRoutes = (app: Express): any => {
  app.use(express.json());
  routes.forEach((route) => {
    app[route.method](route.path, ...route.middleware, route.handler);
  });
  app.use(requestMiddleware);
  app.use(errorMiddleware);
};
