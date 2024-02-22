const express = require('express')
const router = express.Router()
const { createTask, updateTask, deleteTask } = require('../controllers/admin')

// //register
// router.post('/register', )

// //login
// router.post('/login', )

//create a new task
router.post('/tasks', createTask)

//update a task
router.patch('/tasks/:id', updateTask)

//delete a task
router.delete('/tasks/:id', deleteTask)

//view submitted tasks
router.get('/tasks/:id/submissions')

//grade a submission
router.put('/tasks/:id/submissions/:submissionId/grade')

module.exports = router
