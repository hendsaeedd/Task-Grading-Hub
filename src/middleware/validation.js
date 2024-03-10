const { body } = require('express-validator')

const registerValidation = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .trim()
    .notEmpty()
    .isAlpha()
    .withMessage('only letters are allowed'),
  body('password')
    .isLength({ min: 6 })
    .notEmpty()
    .withMessage('Password must be at least 6 characters long'),
  body('password').isStrongPassword().withMessage('password must be strong'),
]

const loginValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
]

const createTasksValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('deadline').notEmpty().withMessage('Deadline is required').isDate(),
]

const submittedTasksValidation = [
  body('username').notEmpty().withMessage('Username is required'),
  body('notes').notEmpty().withMessage('Notes is required'),
]

module.exports = {
  registerValidation,
  loginValidation,
  createTasksValidation,
  submittedTasksValidation,
}
