const mongoose = require('mongoose');

const newsfeedSchema = new mongoose.Schema({
    description: { type: String, required: true},
    discount: { type: Number, required: true }, // Assuming discount is a percentage value
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true,  } // Assuming you have an Item model
}, { timestamps: true });

module.exports = mongoose.model('Newsfeed', newsfeedSchema);
