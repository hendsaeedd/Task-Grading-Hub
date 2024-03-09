const { validationResult } = require('express-validator')
const errorValidation = 
(req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

module.exports = errorValidation
