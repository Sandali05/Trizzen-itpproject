const Feedback = require('../Models/feedback.model');

// Add feedback (Customer)
exports.addFeedback = async (req, res) => {
    try {
        // Extract userId from the authenticated user
        console.log(req.user);
        const userId = req.user.id; // Ensure that req.user is set by your authentication middleware

        // Extract other feedback details from the request body
        const { name, email, rating, comment } = req.body;

        // Create a new feedback entry
        const feedback = new Feedback({ userId, name, email, rating, comment });

        // Save the feedback to the database
        await feedback.save();

        // Respond with success
        res.status(201).json(feedback);
    } catch (error) {
        res.status(201).json({ message: 'Server error', error });
    }
};

// View all feedback (Admin)
exports.getAllFeedback = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('userId', 'name email');
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add or update reply (Admin)
exports.addOrUpdateReply = async (req, res) => {
    try {
        const { feedbackId, reply } = req.body;
        const feedback = await Feedback.findByIdAndUpdate(feedbackId, { reply }, { new: true });
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete reply (Admin)
exports.deleteReply = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const feedback = await Feedback.findByIdAndUpdate(feedbackId, { reply: null }, { new: true });
        res.json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserFeedback = async (req, res) => {
    try {
        // Get user ID from authenticated user
        const userId = req.user.id;

        // Find feedback by the logged-in user
        const feedbacks = await Feedback.find({ userId });

        // If no feedback is found, return a message
        if (feedbacks.length === 0) {
            return res.status(404).json({ message: 'No feedback found for this user' });
        }

        // Return the user's feedback
        res.status(200).json(feedbacks);
        console.log(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
