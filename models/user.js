import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema); // Ensure this line is present

export default User; // Ensure you're exporting the model correctly
