const mongoose = require('mongoose')

const submitSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  // studentName: {
  //   type: String,
  //   required: true,
  // },
  file: {
    data: Buffer,
    type: String,
    required: true,
  },
  path: {
    type: String,
    default: '',
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  notes: {
    type: String,
    default: '',
  },
  gradedBy: {
    type: String,
    default: 'Dr. Hossam',
  },
  grade: {
    type: Number,
    default: null,
  },
  feedback: {
    type: String,
    default: 'Great Job',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Submission = mongoose.model('submissions', submitSchema)

module.exports = Submission
