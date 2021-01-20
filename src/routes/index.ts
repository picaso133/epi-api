import { Router } from "express";
import auth from "./auth";
import user from "./user";
import project from "./project";
import residentManager from "./residentManager";
import projectManager from "./projectManager";
import projectStatus from "./projectStatus";
import designPackage from "./designPackage";
import generalContractor from "./generalContractor";

import state from "./state";
import city from "./city";
import fileStorage from "./fileStorage";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);

routes.use("/state", state);
routes.use("/city", city);
routes.use("/fileStorage", fileStorage);

routes.use("/project", project);
routes.use("/residentManager", residentManager);
routes.use("/projectManager", projectManager);
routes.use("/designPackage", designPackage);
routes.use("/generalContractor", generalContractor);
routes.use("/projectStatus", projectStatus);

export default routes;