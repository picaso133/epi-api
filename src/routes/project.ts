import { Router } from "express";
  import ProjectController from "../controller/ProjectController";
  import { checkJwt } from "../middleware/checkJwt";
  import { checkRole } from "../middleware/checkRole";

  const router = Router();

  //Get all users
  router.get(
    "/", 
    [checkJwt, checkRole(["ADMIN"])],
    ProjectController.listAll
  );

  // Get one user
  router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    ProjectController.getOneById
  );

  //Create a new user
  router.post(
    "/", 
    [checkJwt, checkRole(["ADMIN"])],
    ProjectController.new
  );

  //Edit one user
  router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    ProjectController.edit
  );

  //Delete one user
  router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    ProjectController.delete
  );


  router.post(
    "/:id([0-9]+)/attachDrawings",
    [checkJwt, checkRole(["ADMIN"])],
    ProjectController.attachDrawings
  );

  export default router;