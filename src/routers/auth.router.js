import express from "express";

import authController from "../app/controllers/auth.controller.js";
import validate from "../middlewares/validateUser.js";
import asyncHandler from "../middlewares/asyncHandler.js"

const router = express.Router();

router.post("/login", validate.validateLoginUser, asyncHandler(authController.login));
router.post("/register", validate.validateRegisterUser, asyncHandler(authController.register)); //
router.get("/logout", asyncHandler(authController.logout)); 
router.post("/processNewToken", asyncHandler(authController.processNewToken));



export default router;