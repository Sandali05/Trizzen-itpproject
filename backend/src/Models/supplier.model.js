const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }, // Assuming you have an Item model
  company: { type: String, required: true },
  email: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
