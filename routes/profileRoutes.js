// routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const { updateUserProfile, uploadProfilePicture, getUserDetails } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware'); 

// Update user profile details
router.put('/update', authMiddleware, updateUserProfile);

// Upload user profile picture as Base64
router.post('/uploadPicture', authMiddleware, uploadProfilePicture);

// Route to get user details
router.get('/details', authMiddleware, getUserDetails);


module.exports = router;
