
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the customer
  address: { type: String, required: true }, // Address of the customer
  mobile: { type: String, required: true}, // Mobile number of the customer
  totalAmount: { type: Number, required: true }, // Total amount of the order
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User ID (assumed user is logged in)
  items: [{ type: String, required: true }],
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: 'driver', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
