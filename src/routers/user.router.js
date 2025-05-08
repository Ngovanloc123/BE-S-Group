import express from "express";

import userController from "../app/controllers/user.controller.js";
import validate from "../middlewares/validateUser.js";


const router = express.Router();

router.post("/register", validate.validateRegisterUser, userController.register); //
router.put("/:id", validate.validateUpdateUser, userController.update); //
router.post("/login", userController.login);
router.delete("/:id", userController.delete);
router.get("/:id", userController.get);
router.get("/", userController.getAll);

export default router;