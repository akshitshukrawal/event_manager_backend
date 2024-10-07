import express from 'express';
import { createBooking, getBookings,getUserBookings } from '../controllers/bookings.js';

const router = express.Router();

// Route to get all bookings (you can add further filters as needed)
router.get('/', getBookings);

// Route to create a new booking (protected by auth middleware)
router.post('/',createBooking);

// Route to get bookings for a specific user
router.get('/user/:userId', getUserBookings);

export default router;
