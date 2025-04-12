import express from "express";
import userValidate from "../middlewares/validate.js";

import userController from "../app/controllers/user.controller.js";

const router = express.Router();

router.get("/add", userController.addView)
router.get("/edit/:id", userController.getUserById)
router.get("/", userController.getAllUsers);
router.post("/", userValidate, userController.upsertUser);

// router.put("/:id", userValidate, userController.updateUserFull);
// router.patch("/:id", userValidate,  userController.updateUserPartial);


router.delete("/:id", userController.deleteUser);



export default router;
