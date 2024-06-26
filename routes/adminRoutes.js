// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const { getAllStudents } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware'); 
const adminMiddleware = require('../middleware/adminMiddleware'); 
const { getUserCounts } = require('../controllers/adminController');



// Get all student records
router.get('/students', authMiddleware, adminMiddleware, getAllStudents);

router.get('/count', authMiddleware, adminMiddleware, getUserCounts);


module.exports = router;
