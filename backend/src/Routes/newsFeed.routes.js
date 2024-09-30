const express = require('express');
const router = express.Router();
const newsfeedController = require('../Controllers/newsFeed.controller');
const { adminMiddleware, isAdmin } = require('../Middlewares/admin.auth');

// Add a newsfeed item
router.post('/newsfeeds',adminMiddleware, isAdmin, newsfeedController.addNewsfeed);

// Get all newsfeed items
router.get('/newsfeeds', newsfeedController.getAllNewsfeeds);

// Get a newsfeed item by ID
router.get('/newsfeeds/:newsfeedId', newsfeedController.getNewsfeedById);

// Update a newsfeed item
router.put('/newsfeeds/:newsfeedId',adminMiddleware, isAdmin, newsfeedController.updateNewsfeed);

// Delete a newsfeed item
router.delete('/newsfeeds/:newsfeedId',adminMiddleware, isAdmin, newsfeedController.deleteNewsfeed);

module.exports = router;
