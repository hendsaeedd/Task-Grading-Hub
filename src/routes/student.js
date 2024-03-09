const express = require('express')
const router = express.Router()
const {
  viewTasks,
  specificTask,
  submitTask,
  uploadPdf,
  checkGrades,
} = require('../controllers/student')
const {submittedTasksValidation} = require('../middleware/validation')
const errorValidation = require('../middleware/errorValidation')

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Student controllers
 */

/**
 * @swagger
 * /student/tasks:
 *   get:
 *     summary: View tasks
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: Successfully viewed the tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully viewed the tasks
 *                 task:
 *                   type: array
 *       400:
 *         description: Failed to view tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to view tasks
 */
//view tasks
router.get('/tasks', viewTasks)

/**
 * @swagger
 * /student/tasks/{id}:
 *   get:
 *     summary: Get a specific task
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: View specific tasks
 *     responses:
 *       200:
 *         description: Successfully retrieved the task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully retrieved the task
 *                 submissions:
 *                   type: object
 *                   properties:
 *                     taskId:
 *                       type: string
 *                       example: 123
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
 *         description: Failed to view specific task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to view specific task
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Task not found
 */
//get details of a specific task
router.get('/tasks/:id', specificTask)

/**
 * @swagger
 * /student/tasks/{id}/submissions:
 *   post:
 *     summary: Submit a task
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               notes:
 *                 type: string
 *               file:
 *                 type: pdf
 *                 format: buffer
 *     responses:
 *       200:
 *         description: Task submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task submitted successfully
 *                 submissions:
 *                   type: object
 *                   properties:
 *                     taskId:
 *                       type: string
 *                       example: 123
 *                     username:
 *                       type: string
 *                       example: username
 *                     notes:
 *                       type: string
 *                       example: thanks
 *                     file:
 *                       type: pdf
 *                       format: buffer
 *       400:
 *         description: Failed to submit task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to submit task
 */
//submit a task file
router.post(
  '/tasks/:id/submissions',
  submittedTasksValidation,
  errorValidation,
  uploadPdf,
  submitTask
)

/**
 * @swagger
 * /student/tasks/{id}/submissions/{userId}/grade:
 *   get:
 *     summary: Check grades for a specific task
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Successfully get the grades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task grades viewed successfully
 *                 submissions:
 *                   type: object
 *                   properties:
 *                     taskId:
 *                       type: string
 *                       example: 123
 *                     userId:
 *                       type: string
 *                       example: 1234
 *                     feedback:
 *                       type: string
 *                       example: thanks
 *                     grade:
 *                       type: number
 *                       example: 30
 *       400:
 *         description: Failed to check grades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to check grades
 *       403:
 *         description: You can only access your own grades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: You can only access your own grades
 */
//check the grades after a task is graded
router.get('/tasks/:id/submissions/:userId/grade', checkGrades)

module.exports = router
