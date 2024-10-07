// src/controllers/events.js
import Event from '../models/event.js'; // Ensure you import your Event model

// Create an event
export const createEvent = async (req, res) => {
    try {
        const { name, ticketsLeft,date } = req.body;

        const newEvent = new Event({
            name,
            date,
            ticketsLeft,
            soldTickets: 0,
            totalTickets: ticketsLeft,
        });

        await newEvent.save();
        res.status(201).json(newEvent); // Respond with the created event
    } catch (error) {
        res.status(500).json({ message: 'Server error', error }); // Handle server error
    }
};

// Get all events
export const getEvents = async (req, res) => { // Changed function name to getEvents
    try {
        const events = await Event.find(); // Fetch all events from the database
        res.status(200).json(events); // Return the events in the response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
    }
};

// Get event by ID
export const getEventById = async (req, res) => {
    const eventId = req.params.eventId; // Extract eventId from request parameters
    try {
        const event = await Event.findById(eventId); // Find event by ID

        if (!event) {
            return res.status(404).json({ message: 'Event not found' }); // Handle event not found
        }

        res.status(200).json(event); // Return the found event
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error }); // Handle server error
    }
};

// Delete event by ID
export const deleteEvent = async (req, res) => {
    const eventId = req.params.eventId; // Corrected how eventId is extracted
    try {
        const event = await Event.findByIdAndDelete(eventId); // Delete event by ID
        if (!event) {
            return res.status(404).json({ message: 'Event not found' }); // Handle event not found
        }
        res.status(200).json({ message: 'Event deleted successfully' }); // Respond with success message
    } catch (error) {
        res.status(500).json({ message: 'Server error', error }); // Handle server error
    }
};
