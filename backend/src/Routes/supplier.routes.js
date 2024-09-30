const express = require('express');
const router = express.Router();
const supplierController = require('../Controllers/supplier.controller');
const { adminMiddleware, isAdmin } = require('../Middlewares/admin.auth');

// Route to add a new supplier
router.post('/add/suppliers', adminMiddleware, isAdmin, supplierController.createSupplier);

// Route to get all suppliers
router.get('/suppliers', adminMiddleware, isAdmin, supplierController.getAllSuppliers);

// Route to get a supplier by ID
router.get('/suppliers/:id', adminMiddleware, isAdmin, supplierController.getSupplierById);

// Route to update a supplier by ID
router.put('/suppliers/:id', adminMiddleware, isAdmin, supplierController.updateSupplier);

// Route to delete a supplier by ID
router.delete('/suppliers/:id', adminMiddleware, isAdmin, supplierController.deleteSupplier);

module.exports = router;
