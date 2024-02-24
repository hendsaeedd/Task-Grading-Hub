const User = require('../models/user')

// Register user
const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body

    // Check if the role is "admin"
    if (role && role.toLowerCase() === 'admin') {
      //////
      // Check if an admin user already exists
      const adminExists = await User.exists({ role: 'admin' })
      if (adminExists) {
        return res.status(400).json({ error: 'Admin already exists' })
      }
    }

    // If role is not provided or is not "admin", default to "student"
    const newUser = await User.create({
      username,
      password,
      role: role && role.toLowerCase() === 'admin' ? 'admin' : 'student',
    })

    res
      .status(201)
      .json({ message: 'User was registered successfully', user: newUser })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(400).json({ error: 'Failed to register user' })
  }
}

// Login user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }

    // If the user is an admin, grant additional privileges
    if (user.role === 'admin') {
      /////
      return res
        .status(200)
        .json({ message: 'Admin logged in successfully', user })
    }

    // For non-admin users, proceed with regular login
    res.status(200).json({ message: 'User logged in successfully', user })
  } catch (error) {
    console.error('Error logging in user:', error)
    res.status(500).json({ error: 'Failed to log in user' })
  }
}


module.exports = {
  registerUser,
  loginUser,
}
