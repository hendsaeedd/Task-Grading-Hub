const express = require('express')
const router = express.Router()
const {
  createTask,
  updateTask,
  deleteTask,
  submittedTasks,
  userIdSubmittedTask,
} = require('../controllers/admin')

//create a new task
router.post('/tasks', createTask)

//update a task
router.patch('/tasks/:id', updateTask)

//delete a task
router.delete('/tasks/:id', deleteTask)

//view submitted tasks
router.get('/tasks/:id/submissions', submittedTasks)

//view submitted tasks with user id
router.get('/tasks/:id/submissions/:userId', userIdSubmittedTask)

//grade a submission
router.put('/tasks/:id/submissions/:submissionId/grade')

module.exports = router
