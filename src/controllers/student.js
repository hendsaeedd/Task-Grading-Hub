const Task = require('../models/task')

//view tasks
const viewTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
    res.status(200).json({ tasks })
  } catch (error) {
    console.error('Error viewing tasks:', error)
    res.status(400).json({ error: 'Failed to view tasks' })
  }
}

//get details of a specific task
const specificTask = async (req, res) => {
    try {
        const { id } = req.params
        await Task.findById(id)
        res.status(200).json(tasks)
    } catch (error) {
        console.error('Error getting task:', error)
        res.status(400).json({ error: 'Failed to get task' })
      }
}

module.exports = {
    viewTasks,
    specificTask
}