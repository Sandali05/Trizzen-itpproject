const Supplier = require('../Models/supplier.model');
const mongoose = require('mongoose');

// Add a new Supplier
exports.createSupplier = async (req, res) => {
  try {
    const { name, address, mobile, itemId, company, email } = req.body
    const newSupplier = new Supplier({ name, address, mobile, itemId, company, email });
    const savedSupplier = await newSupplier.save();
    res.status(201).json(savedSupplier);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
};

// Get all Suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a Supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.status(200).json(supplier);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a Supplier
exports.updateSupplier = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSupplier) return res.status(404).json({ message: 'Supplier not found' });
    res.status(200).json(updatedSupplier);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a Supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
