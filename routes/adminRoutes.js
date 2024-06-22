// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { getAllStudents } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware'); 
const adminMiddleware = require('../middleware/adminMiddleware'); 


// Get all student records
router.get('/students', authMiddleware, adminMiddleware, getAllStudents);

module.exports = router;
