const express = require('express')
const router = express.Router()
const {
  viewTasks,
  specificTask,
  submitTask,
  uploadPdf,
  checkGrades,
} = require('../controllers/student')

const verifyToken = require('../middleware/verifyToken')

//view tasks
router.get('/tasks', verifyToken, viewTasks)

//get details of a specific task
router.get('/tasks/:id', verifyToken, specificTask)

//submit a task file
router.post('/tasks/:id/submissions', uploadPdf, submitTask)

//check the grades after a task is graded
router.get('/tasks/:id/submissions/:userId/grade', verifyToken, checkGrades)

module.exports = router
