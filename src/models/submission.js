const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  file: {
    data: Buffer,
    type: String,
    required: true,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  gradedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  grade: {
    type: Number,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Task = mongoose.model('tasks', taskSchema)

module.exports = Task
