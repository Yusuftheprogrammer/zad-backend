import express from 'express';
import { login, logout, getProfile } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post("/auth/login", login);

// Protected routes
router.post("/auth/logout", authenticate, logout);
router.get("/auth/profile", authenticate, getProfile);

export default router;