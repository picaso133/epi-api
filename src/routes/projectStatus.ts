import { Router } from "express";
import ProjectStatusController from "../controller/ProjectStatusController";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";

const router = Router();

//Get all states
router.get(
    "/", 
    [checkJwt, checkRole(["ADMIN"])], 
    ProjectStatusController.listAll
);

// // Get one state
router.get(
    "/:id([0-9]+)", 
    [checkJwt, checkRole(["ADMIN"])], 
    ProjectStatusController.getOneById
);

//Create a new state
router.post(
    "/",
    [checkJwt,checkRole(["ADMIN"])],
    ProjectStatusController.new
);

//Edit one city
router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    ProjectStatusController.edit
);

//Delete one city
router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    ProjectStatusController.delete
);

export default router;