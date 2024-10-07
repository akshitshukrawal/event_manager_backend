import User from '../models/user.js';
import bcrypt from 'bcryptjs';

// User login
export const loginUser = async (req, res) => {
    const { username, password } = req.body; // Extract username and password from the request body
    try {
        const user = await User.findOne({ username }); // Find user by username
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials: User not found' }); // User not found
        }

        // Compare the hashed password with the provided password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) { // Check if passwords match
            return res.status(400).json({ message: 'Invalid credentials: Wrong password' }); // Invalid password
        }

        // Respond with user data (excluding password)
        const { password: _, ...userData } = user._doc; // Exclude the password from response
        res.json(userData);
    } catch (error) {
        res.status(500).json({ message: 'Server error' }); // Handle server error
    }
};

// User registration
export const registerUser = async (req, res) => {
    const { username, password } = req.body; // Extract username and password from request body
    try {
        let user = await User.findOne({ username }); // Check if user already exists
        if (user) {
            return res.status(400).json({ message: 'User already exists' }); // User exists
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
        user = new User({
            username,
            password: hashedPassword // Save hashed password
        });

        await user.save(); // Save the new user to the database
        res.status(201).json(user); // Respond with the created user
    } catch (error) {
        res.status(500).json({ message: 'Server error', error }); // Handle server error
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json(users); // Return the users in the response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle any errors
    }
};

// Admin user check
export const adminUser = async (req, res) => {
    const { username } = req.body; 
    try {
        // Check if the provided credentials match the admin credentials
        if (username !== "akshitsh22") {
            return res.json({ isAdmin: false }); // Admin credentials
        }
        
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials: User not found' }); // User not found
            console.log("thi s  admin")
        }


        // If the credentials are valid but not for admin
        return res.json({ isAdmin: true }); // Not an admin
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
