import express from "express";

import authController from "../app/controllers/auth.controller.js";
import validate from "../middlewares/validateUser.js";

const router = express.Router();

router.post("/login", validate.validateLoginUser, authController.login);
router.post("/register", validate.validateRegisterUser, authController.register); //

export default router;