const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Task = mongoose.model('tasks', taskSchema)

module.exports = Task
