// controllers/attendanceController.js

const Attendance = require('../models/Attendance');
const User = require('../models/User');

// Get attendance records for a user
exports.getAttendanceRecords = async (req, res) => {
  try {
  
    const attendanceRecords = await Attendance.find({ userId: req.user.id });
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Mark attendance for a user
exports.markAttendance = async (req, res) => {
  const { date, status } = req.body;
  try {
    // Check if attendance is already marked for the date
    const existingRecord = await Attendance.findOne({ userId: req.user.id, date: new Date(date).toDateString() });

    if (existingRecord) {
      return res.status(400).json({ message: 'Attendance already marked for this date' });
    }

    const attendance = new Attendance({
      userId: req.user.id,
      date: new Date(date).toDateString(),
      status: status || 'present'
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Admin: View all attendance records
exports.getAllAttendanceRecords = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate('userId', 'name email');
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  const { userId, date, status } = req.body;
  try {
    const attendance = new Attendance({
      userId,
      date: new Date(date).toDateString(),
      status
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Update an existing attendance record
exports.updateAttendance = async (req, res) => {
  const { id, status } = req.body;
  try {
    const attendance = await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    attendance.status = status;
    attendance.updatedAt = Date.now();

    await attendance.save();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Delete an attendance record
exports.deleteAttendance = async (req, res) => {
  const { id } = req.params;
  try {
    const attendance = await Attendance.findByIdAndDelete(id);

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.json({ message: 'Attendance record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};



// Generate attendance report
exports.generateAttendanceReport = async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.query;

    const filter = {
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    };

    if (userId) {
      filter.userId = userId;
    }

    const attendanceRecords = await Attendance.find(filter).populate('userId', 'name email');
    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};