const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

//register user
const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body

    //check password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: 'Password must be 6 characters or more' })
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    //check if the role is admin
    if (role && role.toLowerCase() === 'admin') {
      //check if an admin user already exists
      const adminExists = await User.exists({ role: 'admin' })
      if (adminExists) {
        return res.status(400).json({ error: 'Admin already exists' })
      }
    }

    //if user already exists
    const userExists = await User.exists({ username })
    if (userExists) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: role ? role : 'student',
    })

    res
      .status(200)
      .json({ message: 'User was registered successfully', user: newUser })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(400).json({ error: 'Failed to register user' })
  }
}

//login user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    //if the user does not exist, return error
    if (!user) {
      return res.status(400).json({ error: 'Username not exist' })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    //generate JWT token for authenticated user
    const accessToken = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_IN }
    )
    //set the token as a cookie
    res.cookie('token', accessToken, { httpOnly: true })

    //if the user is an admin, grant additional privileges
    if (user.role === 'admin') {
      return res
        .status(200)
        .json({ message: 'Admin logged in successfully', user, accessToken })
    }

    res
      .status(200)
      .json({ message: 'User logged in successfully', user, accessToken })
  } catch (error) {
    console.error('Error logging in user:', error)
    res.status(500).json({ error: 'Failed to log in user' })
  }
}

//logout
// const logoutUser = (req, res) => {
//   res.clearCookie('token')
//   res.json({ message: 'Logout successful.' })
//   res.redirect('/')
// }

module.exports = {
  registerUser,
  loginUser,
}
