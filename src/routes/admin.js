const express = require('express')
const router = express.Router()
const {
  createTask,
  updateTask,
  deleteTask,
  submittedTasks,
  userIdSubmittedTask,
  gradeSubmittedTask,
} = require('../controllers/admin')
const {createTasksValidation} = require('../middleware/validation')
const errorValidation = require('../middleware/errorValidation')

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin controllers
 */

/**
 * @swagger
 * /admin/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task created successfully
 *                 task:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: task one
 *                     description:
 *                       type: string
 *                       example: this is a task one description
 *                     deadline:
 *                       type: string
 *                       format: date
 *       400:
 *         description: Failed to create task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to create task
 */

//create a new task
router.post('/tasks', createTasksValidation, errorValidation, createTask)

/**
 * @swagger
 * /admin/tasks/{id}:
 *   patch:
 *     summary: Update a task
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               deadline:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task updated successfully
 *                 task:
 *                   type: object
 *                   properties:
 *                     taskId:
 *                       type: string
 *                       example: 67t655
 *                     title:
 *                       type: string
 *                       example: task 1
 *                     description:
 *                       type: string
 *                       example: this is a task 1 description
 *                     deadline:
 *                       type: string
 *                       format: date
 *       400:
 *         description: Failed to update task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to update task
 */
//update a task
router.patch('/tasks/:id', updateTask)

/**
 * @swagger
 * /admin/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully
 *                 task:
 *                   type: object
 *                   properties:
 *                     taskId:
 *                       type: string
 *                       example: 1324356
 *       400:
 *         description: Failed to delete task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to delete task
 */
//delete a task
router.delete('/tasks/:id', deleteTask)

/**
 * @swagger
 * /admin/tasks/{id}/submissions:
 *   get:
 *     summary: View submitted tasks
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task
 *     responses:
 *       200:
 *         description: Successfully retrieved submitted tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 submissions:
 *                   type: array
 *                 task:
 *                   type: object
 *                   properties:
 *                     taskId:
 *                       type: string
 *                       example: 1a2b3c
 *       400:
 *         description: Failed to view submitted tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to view submitted tasks
 */

//view submitted tasks
router.get('/tasks/:id/submissions', submittedTasks)

/**
 * @swagger
 * /admin/tasks/{id}/submissions/{userId}:
 *   get:
 *     summary: View submitted tasks with user ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved submitted tasks with user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *                 submissions:
 *                   type: object
 *                   properties:
 *                     taskId:
 *                       type: string
 *                       example: 546
 *                     userId:
 *                       type: string
 *                       example: 123
 *       400:
 *         description: Failed to view submitted tasks with user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to view submitted tasks with user ID
 */
//view submitted tasks with user id
router.get('/tasks/:id/submissions/:userId', userIdSubmittedTask)

/**
 * @swagger
 * /admin/tasks/{id}/submissions/{userId}grade:
 *   patch:
 *     summary: Grade a submitted task
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               grade:
 *                 type: number
 *               feedback:
 *                 type: string
 *               gradedBy:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task graded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task graded successfully
 *                 submissions:
 *                   type: object
 *                   properties:
 *                     taskId:
 *                       type: string
 *                       example: 123
 *                     userId:
 *                       type: string
 *                       example: 123
 *                     grade:
 *                       type: number
 *                       example: 55
 *       400:
 *         description: Failed to grade task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to grade task
 */
//grade a submitted tasks with user id
router.patch('/tasks/:id/submissions/:userId/grade', gradeSubmittedTask)

module.exports = router
