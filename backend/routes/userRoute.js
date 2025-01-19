import express from 'express';
import {
    loginAdmin,
    createAdmin
} from '../controllers/userController.js';

const router = express.Router();

// Auth routes


// Admin routes
router.post('/login', loginAdmin);
router.post('/create', createAdmin);

// User management routes

export default router;
