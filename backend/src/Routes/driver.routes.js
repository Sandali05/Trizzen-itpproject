const express = require('express');
const router = express.Router();
const driverController = require('../Controllers/drivers.controller');
const adminMiddleware = require('../Middlewares/admin.auth');

router.post('/add/drivers',adminMiddleware.adminMiddleware,adminMiddleware.isAdmin,driverController.createDriver);

router.get('/drivers', driverController.getAllDrivers);

router.get('/drivers/:id', driverController.getDriverById);

router.put('/drivers/:id', adminMiddleware.adminMiddleware,adminMiddleware.isAdmin, driverController.updateDriver);

router.delete('/drivers/:id', adminMiddleware.adminMiddleware,adminMiddleware.isAdmin, driverController.deleteDriver);

router.put('/drivers/assign-order', adminMiddleware.adminMiddleware,adminMiddleware.isAdmin, driverController.assignOrderToDriver);

module.exports = router;
