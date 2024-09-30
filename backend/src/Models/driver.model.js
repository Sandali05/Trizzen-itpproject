const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true},
  mobile: { type: String, required: true},
  address: { type: String, required: true },
  vehicleId: { type: String, required: true},
  category: { type: String, enum: ['car', 'truck', 'bike'], required: true },
  orderStatus: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  assignedOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: null }  // Linked Order
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);
