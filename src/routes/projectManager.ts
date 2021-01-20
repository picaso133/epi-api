import { Router } from "express";
  import ProjectManagerController from "../controller/ProjectManagerController";
  import { checkJwt } from "../middleware/checkJwt";
  import { checkRole } from "../middleware/checkRole";

  const router = Router();

  //Get all users
  router.get(
    "/", 
    [checkJwt, checkRole(["ADMIN"])],
    ProjectManagerController.listAll
  );

  // Get one user
  router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    ProjectManagerController.getOneById
  );

  //Create a new user
  router.post(
    "/", 
    [checkJwt, checkRole(["ADMIN"])],
    ProjectManagerController.new
  );

  //Edit one user
  router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    ProjectManagerController.edit
  );

  //Delete one user
  router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    ProjectManagerController.delete
  );

  export default router;