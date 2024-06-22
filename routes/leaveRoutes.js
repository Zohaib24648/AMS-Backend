// routes/leaveRoutes.js

const express = require('express');
const {
  getLeaveRequests,
  submitLeaveRequest,
  getAllLeaveRequests,
  updateLeaveRequestStatus
} = require('../controllers/leaveRequestController');
const authMiddleware = require('../middleware/authMiddleware'); 
const adminMiddleware = require('../middleware/adminMiddleware'); 

const router = express.Router();

router.get('/getleaves', authMiddleware, getLeaveRequests);

router.post('/postleave', authMiddleware, submitLeaveRequest);


router.get('/getallleaves', authMiddleware, adminMiddleware, getAllLeaveRequests);


router.patch('/updateleavestatus', authMiddleware, adminMiddleware, updateLeaveRequestStatus);

module.exports = router;
