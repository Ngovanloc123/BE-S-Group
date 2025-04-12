import express from "express";


import userController from "../app/controllers/user.controller.js";

const router = express.Router();


router.get("/:id", userController.getUserById);
router.get("/", userController.getAllUsers);

router.put("/:id", userController.updateUserFull);
router.patch("/:id", userController.updateUserPartial);
router.post("/", userController.addUser);


router.delete("/:id", userController.deleteUser);

export default router;
