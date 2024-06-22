// controllers/gradeController.js

const Grade = require('../models/Grade');

// Create or update grading criteria
exports.setGradingCriteria = async (req, res) => {
  const { userId, attendancePercentage, grade } = req.body;

  try {
    let grading = await Grade.findOne({ userId });

    if (grading) {
      // Update existing criteria
      grading.attendancePercentage = attendancePercentage;
      grading.grade = grade;
    } else {
      // Create new grading criteria
      grading = new Grade({
        userId,
        attendancePercentage,
        grade
      });
    }

    await grading.save();
    res.json(grading);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Get grading criteria for a user
exports.getGradingCriteria = async (req, res) => {
  const { userId } = req.params;

  try {
    const grading = await Grade.findOne({ userId }).populate('userId', 'name email');

    if (!grading) {
      return res.status(404).json({ message: 'Grading criteria not found' });
    }

    res.json(grading);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
