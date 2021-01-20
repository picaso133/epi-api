import { Router } from "express";
import GeneealContractorController from "../controller/GeneralContractorController";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";

  const router = Router();

  //Get all users
  router.get(
    "/", 
    [checkJwt, checkRole(["ADMIN"])],
    GeneealContractorController.listAll
  );

  // Get one user
  router.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    GeneealContractorController.getOneById
  );

  //Create a new user
  router.post(
    "/", 
    [checkJwt, checkRole(["ADMIN"])],
    GeneealContractorController.new
  );

  //Edit one user
  router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    GeneealContractorController.edit
  );

  //Delete one user
  router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    GeneealContractorController.delete
  );

  export default router;