// controllers/leaveRequestController.js

const LeaveRequest = require('../models/LeaveRequest');
const Attendance = require('../models/Attendance');


// Get leave requests for a user
exports.getLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find({ userId: req.user.id });
    res.json(leaveRequests);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Submit a new leave request
exports.submitLeaveRequest = async (req, res) => {
  const { startDate, endDate, reason } = req.body;

  try {
    const leaveRequest = new LeaveRequest({
      userId: req.user.id,
      startDate,
      endDate,
      reason
    });

    await leaveRequest.save();
    res.status(201).json(leaveRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Admin: View all leave requests
exports.getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().populate('userId', 'name email');
    console.log("Leave function called");
    console.log(leaveRequests)
    res.json(leaveRequests);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Admin: Approve or reject a leave request
exports.updateLeaveRequestStatus = async (req, res) => {
  const { id, status } = req.body;

  try {
    const leaveRequest = await LeaveRequest.findById(id);

    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    leaveRequest.status = status;
    await leaveRequest.save();

    // If the leave request is approved, update the attendance records
    if (status === 'approved') {
      const { userId, startDate, endDate } = leaveRequest;
      const start = new Date(startDate);
      const end = new Date(endDate);
      let currentDate = start;

      while (currentDate <= end) {
        await Attendance.findOneAndUpdate(
          { userId: userId, date: currentDate },
          { status: 'leave' },
          { upsert: true, new: true }
        );
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    res.json(leaveRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
