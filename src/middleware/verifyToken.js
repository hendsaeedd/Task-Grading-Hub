const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwt')
const dotenv = require('dotenv')
dotenv.config()

//middleware for verifying jwt tokens
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' })
  }

  const tokenParts = token.split(' ')
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Unauthorized: Invalid token format' })
  }

  const jwtToken = tokenParts[1]

  jwt.verify(jwtToken, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ error: 'Unauthorized: Invalid token, Please return to login' })
    }

    req.user = decoded
    next()
  })
}

module.exports = verifyToken
