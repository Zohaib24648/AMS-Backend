// routes/gradeRoutes.js

const express = require('express');
const {
  setGradingCriteria,
  getGradingCriteria
} = require('../controllers/gradeController');
const authMiddleware = require('../middleware/authMiddleware'); 
const adminMiddleware = require('../middleware/adminMiddleware'); 

const router = express.Router();

// Admin: Set or update grading criteria
router.post('/set', authMiddleware, adminMiddleware, setGradingCriteria);

// Admin: Get grading criteria for a user
router.get('/get/:userId', authMiddleware, adminMiddleware, getGradingCriteria);

module.exports = router;
