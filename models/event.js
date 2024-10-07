import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    totalTickets: {
        type: Number,
        required: true
    },
    soldTickets: {
        type: Number,
        default: 0
    },
    ticketsLeft: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Event', eventSchema);
