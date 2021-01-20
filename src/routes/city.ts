import { Router } from "express";
import CityController from "../controller/CityController";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";

const router = Router();

//Get all states
router.get(
    "/", 
    [checkJwt, checkRole(["ADMIN"])], 
    CityController.listAll
);

// // Get one state
router.get(
    "/:id([0-9]+)", 
    [checkJwt, checkRole(["ADMIN"])], 
    CityController.getOneById
);

//Create a new state
router.post(
    "/",
    [checkJwt,checkRole(["ADMIN"])],
    CityController.new
);

//Edit one city
router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    CityController.edit
);

//Delete one city
router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    CityController.delete
);

export default router;