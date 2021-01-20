import { Router } from "express";
  import ResidentManagerController from "../controller/ResidentManagerController";
  import { checkJwt } from "../middleware/checkJwt";
  import { checkRole } from "../middleware/checkRole";

  const router = Router();

  //Get all users
  router.get(
    "/", 
    [checkJwt, checkRole(["ADMIN"])],
    ResidentManagerController.listAll
  );

  // Get one user
  router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    ResidentManagerController.getOneById
  );

  //Create a new user
  router.post(
    "/", 
    [checkJwt, checkRole(["ADMIN"])],
    ResidentManagerController.new
  );

  //Edit one user
  router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    ResidentManagerController.edit
  );

  //Delete one user
  router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    ResidentManagerController.delete
  );

  export default router;