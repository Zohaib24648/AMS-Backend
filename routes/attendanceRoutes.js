// routes/attendanceRoutes.js

const express = require('express');
const {
  getAttendanceRecords,
  markAttendance,
  getAllAttendanceRecords,
  createAttendance,
  updateAttendance,
  deleteAttendance,
  generateAttendanceReport
} = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware'); 
const adminMiddleware = require('../middleware/adminMiddleware'); 

const router = express.Router();

router.get('/getAttendance', authMiddleware, getAttendanceRecords);

router.post('/markAttendance', authMiddleware, markAttendance);

router.get('/all', authMiddleware, adminMiddleware, getAllAttendanceRecords);


// Admin: Create new attendance record
router.post('/create', authMiddleware, adminMiddleware, createAttendance);

// Admin: Update attendance record
router.put('/update', authMiddleware, adminMiddleware, updateAttendance);

// Admin: Delete attendance record
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteAttendance);


// Admin: Generate attendance report
router.get('/report', authMiddleware, adminMiddleware, generateAttendanceReport);


router.get('/all', authMiddleware, adminMiddleware, getAllAttendanceRecords);


module.exports = router;
