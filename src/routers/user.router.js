import express from "express";

import userController from "../app/controllers/user.controller.js";
import validate from "../middlewares/validateUser.js";


const router = express.Router();

router.use("/api/forget-password/:id", userController.forgetPassword);
router.use("/api/password-reset/:token", userController.resetPassword);
router.put("/:id", validate.validateUpdateUser, userController.update); //

router.delete("/:id", userController.delete);
router.get("/:id", userController.get);
router.get("/", userController.getAll);

export default router;