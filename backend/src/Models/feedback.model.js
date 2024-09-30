const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const feedbackSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    name: { type: String, required: true},
    email: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    reply: { type: String }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
