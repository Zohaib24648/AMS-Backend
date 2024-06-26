const GradeCriteria = require('../models/GradeCriteria');

// Get all grade criteria
exports.getAllGradeCriteria = async (req, res) => {
  try {
    const criteria = await GradeCriteria.find();
    res.json(criteria);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Create or update grade criteria
exports.upsertGradeCriteria = async (req, res) => {
  const { grade, minPercentage, maxPercentage } = req.body;

  try {
    const existingCriteria = await GradeCriteria.findOne({ grade });
    if (existingCriteria) {
      existingCriteria.minPercentage = minPercentage;
      existingCriteria.maxPercentage = maxPercentage;
      existingCriteria.updatedAt = Date.now();
      await existingCriteria.save();
      res.json(existingCriteria);
    } else {
      const newCriteria = new GradeCriteria({
        grade,
        minPercentage,
        maxPercentage
      });
      await newCriteria.save();
      res.status(201).json(newCriteria);
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
