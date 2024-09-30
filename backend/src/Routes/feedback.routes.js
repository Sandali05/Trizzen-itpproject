const express = require('express');
const router = express.Router();
const feedbackController = require('../Controllers/feedback.controller');
const authMiddleware = require('../Middlewares/admin.auth');
const userMiddleware = require('../Middlewares/user.auth');

// Routes accessible to customers
router.post('/feedback',userMiddleware, feedbackController.addFeedback);
router.get('/feedback',userMiddleware, feedbackController.getUserFeedback);

// Routes accessible to admin only
router.get('/feedbacks',authMiddleware.adminMiddleware, authMiddleware.isAdmin, feedbackController.getAllFeedback);
router.put('/feedback/reply',authMiddleware.adminMiddleware, authMiddleware.isAdmin, feedbackController.addOrUpdateReply);
router.delete('/feedback/reply/:feedbackId',authMiddleware.adminMiddleware, authMiddleware.isAdmin, feedbackController.deleteReply);

module.exports = router;
