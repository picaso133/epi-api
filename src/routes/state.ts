import { Router } from "express";
import StateCntroller from "../controller/StateController";
import { checkJwt } from "../middleware/checkJwt";
import { checkRole } from "../middleware/checkRole";

const router = Router();

//Get all states
router.get(
    "/", 
    [checkJwt, checkRole(["ADMIN"])], 
    StateCntroller.listAll
);

// // Get one state
router.get(
    "/:id([0-9]+)", 
    [checkJwt, checkRole(["ADMIN"])], 
    StateCntroller.getOneById
);

//Create a new state
router.post(
    "/",
    [checkJwt,checkRole(["ADMIN"])],
    StateCntroller.new
);

//Edit one user
router.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    StateCntroller.edit
);

//Delete one user
router.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    StateCntroller.delete
);

export default router;