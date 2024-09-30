const Newsfeed = require('../Models/newsFeed.model'); // Adjust the path as necessary

// Add a newsfeed item
exports.addNewsfeed = async (req, res) => {
    try {
        const { description, discount, itemId } = req.body;
        const newsfeed = new Newsfeed({ description, discount, itemId });
        await newsfeed.save();
        res.status(201).json({
            message: 'Newsfeed item added successfully',
            newsfeed
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding newsfeed item',
            error
        });
    }
};

// Get all newsfeed items
exports.getAllNewsfeeds = async (req, res) => {
    try {
        const newsfeeds = await Newsfeed.find(); // Assuming you want to include item details
        res.status(200).json(newsfeeds);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching newsfeed items', error });
    }
};

// Update a newsfeed item
exports.updateNewsfeed = async (req, res) => {
    try {
        const { newsfeedId } = req.params;
        const { description, discount, itemId } = req.body;
        
        const newsfeed = await Newsfeed.findById(newsfeedId);
        if (!newsfeed) {
            return res.status(404).json({ message: 'Newsfeed item not found' });
        }
        
        newsfeed.description = description || newsfeed.description;
        newsfeed.discount = discount || newsfeed.discount;
        newsfeed.itemId = itemId || newsfeed.itemId;

        await newsfeed.save();
        res.status(200).json({ message: 'Newsfeed item updated successfully', newsfeed });
    } catch (error) {
        res.status(500).json({ message: 'Error updating newsfeed item', error });
    }
};

// Delete a newsfeed item
exports.deleteNewsfeed = async (req, res) => {
    try {
        const { newsfeedId } = req.params;
        
        const newsfeed = await Newsfeed.findById(newsfeedId);
        if (!newsfeed) {
            return res.status(404).json({ message: 'Newsfeed item not found' });
        }
        
        await newsfeed.deleteOne();
        res.status(200).json({ message: 'Newsfeed item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting newsfeed item', error });
    }
};

// Get a newsfeed item by ID
exports.getNewsfeedById = async (req, res) => {
    try {
        const { newsfeedId } = req.params;
        const newsfeed = await Newsfeed.findById(newsfeedId).populate('itemId', 'name'); // Populate item details if needed

        if (!newsfeed) {
            return res.status(404).json({ message: 'Newsfeed item not found' });
        }

        res.status(200).json({ newsfeed });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching newsfeed item', error });
    }
};
