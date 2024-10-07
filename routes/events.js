import express from 'express';
import { createEvent, getEventById, getEvents, deleteEvent } from '../controllers/events.js'; // Importing the necessary controllers
const router = express.Router();

// Create event route
router.get('/', getEvents); // Get all events
router.post('/', createEvent); // Create a new event
router.get('/:eventId', getEventById); // Get event by ID
router.delete('/:eventId', deleteEvent); // Delete event by ID

export default router;
