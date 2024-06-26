// controllers/adminController.js

const User = require('../models/User');

// Fetch all student records
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'user' }).select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

exports.getUserCounts = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    res.json({ totalUsers, totalAdmins });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
