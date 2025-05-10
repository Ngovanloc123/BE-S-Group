import express from 'express';

import meController from '../app/controllers/me.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/profile', authMiddleware.requiredAuth, meController.getProfile);
// router.put('/profile', authMiddleware.requiredAuth, meController.updateProfile);


export default router;