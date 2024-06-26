const express = require('express');
const { getAllGradeCriteria, upsertGradeCriteria } = require('../controllers/gradeCriteriaController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/grade-criteria', authMiddleware, adminMiddleware, getAllGradeCriteria);
router.post('/grade-criteria', authMiddleware, adminMiddleware, upsertGradeCriteria);

module.exports = router;
