const { registerUser, loginUser } = require('../../controllers/auth')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

jest.mock('../../models/user')
jest.mock('bcrypt')
jest.mock('jsonwebtoken')

describe('registerUser', () => {
  it('should register a new user', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'password',
        role: 'student',
      },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    User.exists.mockReturnValue(false)
    User.create.mockReturnValue(req.body)
    bcrypt.hash.mockReturnValue('password')
    await registerUser(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'User was registered successfully',
      user: req.body,
    })
  })
})

describe('loginUser', () => {
  it('should log in a user successfully', async () => {
    const req = {
      body: { username: 'testuser', password: 'password' },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    }

    const user = {
      username: 'testuser',
      password: 'hashedPassword',
      role: 'student',
    }

    User.findOne.mockResolvedValue(user)
    bcrypt.compare.mockResolvedValue(true)
    jwt.sign.mockReturnValue('accessToken')

    await loginUser(req, res)

    expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' })
    expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword')
    expect(jwt.sign).toHaveBeenCalledWith(
      { username: 'testuser', role: 'student' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRES_IN }
    )
    expect(res.cookie).toHaveBeenCalledWith('token', 'accessToken', {
      httpOnly: true,
    })
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'User logged in successfully',
      user: {
        username: 'testuser',
        role: 'student',
        password: 'hashedPassword',
      },
      accessToken: 'accessToken',
    })
  })

  it('should return error if user does not exist', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'password',
      },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    User.findOne.mockReturnValue(null)
    await loginUser(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Username not exist' })
  })

  it('should return error if password is incorrect', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'password',
      },
    }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    User.findOne.mockReturnValue(req.body)
    bcrypt.compare.mockReturnValue(false)
    await loginUser(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid password' })
  })
})
