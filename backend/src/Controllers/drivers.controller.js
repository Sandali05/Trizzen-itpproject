const Driver = require('../Models/driver.model');

// Create a new Driver
const createDriver = async (req, res) => {
  try {
    const newDriver = new Driver(req.body);
    const savedDriver = await newDriver.save();
    return res.status(201).json(savedDriver);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// Get all Drivers
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    return res.status(200).json(drivers);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Get Driver by ID
const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    return res.status(200).json(driver);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update Driver
const updateDriver = async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDriver) return res.status(404).json({ message: "Driver not found" });
    return res.status(200).json(updatedDriver);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// Delete Driver
const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    return res.status(200).json({ message: "Driver deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Assign an order to a driver
const assignOrderToDriver = async (req, res) => {
  const { driverId, orderId } = req.body;

  try {
    const driver = await Driver.findByIdAndUpdate(driverId, {
      assignedOrder: orderId,
      orderStatus: 'in-progress'
    }, { new: true });

    if (!driver) return res.status(404).json({ message: 'Driver not found' });

    return res.status(200).json({ message: 'Order assigned successfully', driver });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
  assignOrderToDriver
};
