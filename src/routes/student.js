const express = require('express')
const router = express.Router()
const {
  viewTasks,
  specificTask,
  submitTask,
  uploadPdf,
  checkGrades,
} = require('../controllers/student')

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
 *         description: Successfully retrieved tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
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
 *     responses:
 *       200:
 *         description: Successfully retrieved the task
 *         content:
 *           application/json:
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 *         multipart/form-data:
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
 *       400:
 *         description: Failed to submit task
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
//submit a task file
router.post('/tasks/:id/submissions', uploadPdf, submitTask)

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
 *       400:
 *         description: Failed to check grades
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
//check the grades after a task is graded
router.get('/tasks/:id/submissions/:userId/grade', checkGrades)

module.exports = router
