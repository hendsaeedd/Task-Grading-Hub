const express = require('express')
const router = express.Router()
const { viewTasks, specificTask } = require('../controllers/student')

// //register
// router.post('/register', )

// //login
// router.post('/login', )

//view tasks
router.get('/tasks', viewTasks)

//get details of a specific task
router.get('/tasks/:id', specificTask)

//submit a task file
router.post('/tasks/:id/submissions')

//check the grades after a task is graded
router.get('/tasks/:id/submissions/:submissionId/grade')

module.exports = router
