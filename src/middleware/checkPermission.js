const jwt = require('jsonwebtoken')
const User = require('../models/user')

//middleware to check user permissions
const checkPermission = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]

    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET)

    const user = await User.findOne({ username: decodedToken.username })
    const userRole = user ? user.role : null

    //check if the user is an admin
    if (userRole === 'admin') {
      return next()
    } else {
      return res
        .status(403)
        .json({ error: 'Forbidden: Only admins have access to this resource' })
    }
  } catch (error) {
    console.error('Error checking permissions:', error)
    return res.status(401).json({ error: 'Unauthorized: Invalid access token' })
  }
}

module.exports = checkPermission
