const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const port = process.env.PORT || 5000

const connect = require('./src/config/db')
//routes
const authRoutes = require('./src/routes/auth')
const adminRoutes = require('./src/routes/admin')
const studentRoutes = require('./src/routes/student')

//middlewares
//encode url
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.json())

//routes
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
app.use('/student', studentRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
    connect()
})