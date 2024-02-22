const Task = require('../models/task')
const User = require('../models/user')

//create a new task
const createTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body
    const newTask = await Task.create({ title, description, deadline })
    res.status(201).json({ message: 'Task created successfully', task: newTask })
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(400).json({ error: 'Failed to create task' })
  }
}

//update a task
const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body
    const { id } = req.params
    const updatedTask = await Task.findByIdAndUpdate(id, { title, description }, { new: true })
    res.status(200).json({ message: 'Task updated successfully', task: updatedTask })
    } catch (error) {
    console.error('Error updating task:', error)
    res.status(400).json({ error: 'Failed to update task' })
    }
}

//delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    await Task.findByIdAndDelete(id)
    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(400).json({ error: 'Failed to delete task' })
  }
}

module.exports ={
    createTask,
    updateTask,
    deleteTask
}