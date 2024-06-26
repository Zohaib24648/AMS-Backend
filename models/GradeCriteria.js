const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeCriteriaSchema = new Schema({
  grade: {
    type: String,
    required: true,
    enum: ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'F']
  },
  minPercentage: {
    type: Number,
    required: true
  },
  maxPercentage: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('GradeCriteria', gradeCriteriaSchema);
