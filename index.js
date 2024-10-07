import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js';
import bookingRoutes from './routes/bookings.js';
import eventRoutes from './routes/events.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// CORS configuration
app.use(cors({
    origin: "https://akshit-event-frontend.vercel.app", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],               // Allowed methods
    credentials: true,                                       // Allow credentials (cookies, etc.)
    allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"] // Allow required headers
}));

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://akshitshukrawal:nUiGNtwDY8pIakae@megamind.v32mq.mongodb.net/?retryWrites=true&w=majority&appName=Megamind';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit on failure
});

// Routes
app.get('/', (req, res) => {
    res.json("Hello, World!");
});

app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/events', eventRoutes);

// Export the app for Vercel
export default app;
