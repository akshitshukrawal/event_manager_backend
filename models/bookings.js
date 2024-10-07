import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    noOfTickets: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now   
    }
});

export default mongoose.model('Booking', bookingSchema);
