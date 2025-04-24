import express from "express";

import userController from "../app/controllers/user.controller.js";


const router = express.Router();

router.post("/create", userController.create);
router.put("/:id", userController.update); //
router.delete("/:id", userController.delete);
router.get("/:id", userController.get); //
router.get("/", userController.getAll);

export default router;
