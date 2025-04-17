import express from "express";
import userValidate from "../middlewares/validate.js";

import userController from "../app/controllers/user.controller.js";

const router = express.Router();

router.get("/add", userController.add)
router.post("/store", userValidate, userController.store);
router.get("/edit/:id", userController.edit)
router.put("/", userValidate, userController.update);
router.delete("/:id", userController.delete);
router.get("/", userController.show);






export default router;
