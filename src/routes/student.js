const express = require('express')
const router = express.Router()
const {
  viewTasks,
  specificTask,
  submitTask,
  uploadPdf,
} = require('../controllers/student')

//view tasks
router.get('/tasks', viewTasks)

//get details of a specific task
router.get('/tasks/:id', specificTask)

//submit a task file
router.post('/tasks/:id/submissions',uploadPdf, submitTask)

//check the grades after a task is graded
router.get('/tasks/:id/submissions/:submissionId/grade')

module.exports = router
