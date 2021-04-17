import { generateReport } from "../../controllers/report";
import { Route } from "../../models/route";

const basePath = "/api/report";

const reportRoutes: Route[] = [
  {
    method: "get",
    path: basePath + "/generate",
    middleware: [],
    handler: generateReport,
  },
];

export default reportRoutes;
