import express from 'express';

import meController from '../app/controllers/me.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

import asyncHandler from "../middlewares/asyncHandler.js"

const router = express.Router();

router.get('/profile', authMiddleware.requiredAuth, asyncHandler(meController.getProfile));


export default router;