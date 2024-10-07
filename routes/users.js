import express from 'express';
import { registerUser, loginUser, getUsers, adminUser } from '../controllers/users.js'; // Ensure you're importing the correct function

const router = express.Router();

// Get all users route
router.get('/', getUsers);

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Admin check route
router.post('/admin', adminUser); // Use POST for admin check

export default router;
