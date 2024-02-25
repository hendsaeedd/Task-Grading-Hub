const User = require('../models/user')

// Middleware to check user permissions
const checkPermission = async (req, res, next) => {
  const isAdmin = await User.exists({ role: 'admin' })

  const isStudent = await User.exists({ role: 'student' })

  if (isAdmin) {
    return next()
  }
  if (isStudent) {
    return res
      .status(403)
      .json({ error: 'Forbidden: Only admins have access to this resource' })
  }

  return res
    .status(403)
    .json({ error: 'Forbidden: You do not have access to this resource' })
}

module.exports = checkPermission
