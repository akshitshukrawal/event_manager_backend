import Booking from '../models/bookings.js';
import Event from '../models/event.js';
import User from '../models/user.js';

// Create a new booking

export const getBookings = async (req,res) => {
    try {
        const users = await Booking.find(); // Fetch all users from the database
        res.status(200).json(users); // Return the users in the response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
    }
}
// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { eventId, noOfTickets, userId } = req.body;// Log received data

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    console.log('Event found:', event); // Log event details

    // Check if there are enough tickets available
    if (event.ticketsLeft < noOfTickets) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    // Create a new booking
    const booking = new Booking({
      user: userId,
      event: eventId,
      noOfTickets,
      date: new Date(),
    });

    // Save the booking
    await booking.save();
    console.log('Booking created:', booking); // Log booking details

    // Update the user's bookings by adding the booking ID
    const user = await User.findById(userId);
    if (user) {
      user.bookings.push(booking._id); // Add booking ID to user
      await user.save(); // Save updated user
      console.log('User updated with booking:', user); // Log user details
    } else {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the event tickets
    event.soldTickets += noOfTickets;
    event.ticketsLeft -= noOfTickets;
    await event.save();
    console.log('Event updated:', event); // Log event details

    // Respond with success message and booking details
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all bookings for a specific user
export const getUserBookings = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Find all bookings that match the user ID
      const bookings = await Booking.find({ user:userId });
  
      if (bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found for this user' });
      }
  
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookings' });
    }
  };