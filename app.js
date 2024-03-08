const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const port = process.env.PORT || 5000

//error handling middleware
const errorHandler = require('./src/middleware/globalErrorHandling')

//authorized middleware
const checkPermission = require('./src/middleware/checkPermission')
const verifyToken = require('./src/middleware/verifyToken')

const connect = require('./src/config/db')
//routes
const authRoutes = require('./src/routes/auth')
const adminRoutes = require('./src/routes/admin')
const studentRoutes = require('./src/routes/student')

//swagger
const swaggerjsdoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')

//middlewares
//encode url
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())

//mount routes
app.use('/auth', authRoutes)
app.use('/admin', checkPermission, adminRoutes)
app.use('/student', verifyToken, studentRoutes)

//error handling middleware
app.use(errorHandler)
// app.use(handleErrors)

//swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Grading Hub',
      version: '1.0.1',
      description:
        'The Task Grading Hub is a REST API designed to streamline the process of collecting, grading, and providing feedback on tasks submitted by students.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
}

const spacs = swaggerjsdoc(options)
app.use('/api-docs', swaggerui.serve, swaggerui.setup(spacs))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  connect()
})
