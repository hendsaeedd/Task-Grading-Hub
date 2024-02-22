const User = require('../models/user')

// Register user
const registerUser = async (req, res) => {
  try {
    const { username, password, role } = req.body

    // Check if the role is "admin"
    if (role && role.toLowerCase() === 'admin') {
      // Ensure that only admin users can assign the "admin" role
      // Here you can include your logic to check if the current user is an admin
      // For now, let's assume admin registration is allowed without authentication

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

    // Check if the password is correct
    // const isValidPassword = await user.isValidPassword(password)
    // if (!isValidPassword) {
    //   return res.status(401).json({ error: 'Invalid username or password' })
    // }

    // If the user is an admin, grant additional privileges
    if (user.role === 'admin') {
      // Here you can include additional logic to grant admin privileges
      // For example, redirecting to admin dashboard or granting access to admin functionalities
      // For now, we'll just return a message indicating the user is an admin
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

// //delete user
// const deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await User.deleteOne({ username: req.params.name })
//     res.status(200).json({ message: 'User deleted successfully', deletedUser })
//   } catch (error) {
//     res.status(400).json({ error: error.message })
//   }
// }

// //update user
// const updateUser = async (req, res) => {
//   try {
//     const user = await User.updateOne({ username: req.params.name }, req.body)
//     res.status(200).json(user)
//   } catch (error) {
//     res.status(400).json(error.message)
//   }
// }

module.exports = {
  registerUser,
  loginUser,
  // getAllUsers,
  // deleteUser,
  // updateUser,
}
