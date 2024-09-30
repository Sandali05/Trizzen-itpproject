const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/user.model'); // Assuming the User model is in models/User.js

// Admin login
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists and is an admin
        if (!user || user.role !== 'admin') {
            return res.status(400).json({ message: 'Invalid admin credentials' });
        }

        // Check if the password matches the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid admin credentials' });
        }

        // Generate JWT token for admin
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.json({ token, message: 'Admin logged in successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
