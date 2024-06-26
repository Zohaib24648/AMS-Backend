// controllers/leaveRequestController.js

const LeaveRequest = require('../models/LeaveRequest');

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
    res.json(leaveRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
