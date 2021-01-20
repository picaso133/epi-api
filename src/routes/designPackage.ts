import { Router } from "express";
import DesignPackageController from "../controller/DesignPackageController";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";

const router = Router();

//Get all states
router.get(
    "/", 
    [checkJwt, checkRole(["ADMIN"])], 
    DesignPackageController.listAll
);

// // Get one state
router.get(
    "/:id([0-9]+)", 
    [checkJwt, checkRole(["ADMIN"])], 
    DesignPackageController.getOneById
);

//Create a new state
router.post(
    "/",
    [checkJwt,checkRole(["ADMIN"])],
    DesignPackageController.new
);

//Edit one city
router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    DesignPackageController.edit
);

//Delete one city
router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    DesignPackageController.delete
);

export default router;