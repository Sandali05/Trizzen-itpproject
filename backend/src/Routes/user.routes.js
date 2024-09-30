const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile, getAllUsers, getUserById, adminUpdateUserProfile, adminDeleteUserProfile } = require('../Controllers/user.controller');
const authMiddleware = require('../Middlewares/user.auth');
const { adminMiddleware } = require('../Middlewares/admin.auth');
const adminLogin = require('../Controllers/admin.controller');
const router = express.Router();

router.post('/register', registerUser);

//admin login
router.post('/admin-login', adminLogin.adminLogin);


router.post('/login', loginUser);

// Profile routes (protected)
router.get('/profilep-get', authMiddleware, getUserProfile);
router.put('/profile-update', authMiddleware, updateUserProfile);
router.put('/admin-profile-update', adminMiddleware, adminUpdateUserProfile);
router.delete('/profile-delete', authMiddleware, deleteUserProfile);
router.delete('/admin-profile-delete', adminMiddleware, adminDeleteUserProfile);

// Get all users
router.get('/users', getAllUsers);

// Get user by ID
router.get('/users/:id', getUserById);

module.exports = router;
