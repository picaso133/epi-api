import { Router } from "express";
import FileStorageController from "../controller/FileStorageController";
  import { checkJwt } from "../middleware/checkJwt";
  import { checkRole } from "../middleware/checkRole";

  const router = Router();

  //Get all users
  router.get(
    "/", 
    [checkJwt, checkRole(["ADMIN"])],
    FileStorageController.listAll
  );

  // Get one user
  router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    FileStorageController.getOneById
  );

  //Create a new user
  router.post(
    "/", 
    [checkJwt, checkRole(["ADMIN"])],
    FileStorageController.new
  );

  //Edit one user
  router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    FileStorageController.edit
  );

  //Delete one user
  router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    FileStorageController.delete
  );

  export default router;