const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

// Routes
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

logger.info('Connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('Connected to MongoDB.')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB: ', error.message)
  })

// Middleware
app.use(cors())
//app.use(express.static('build')) we don't have a frontend yet
app.use(middleware.tokenExtractor)
app.use(express.json())

// Avoid logging in test mode
if (process.env.NODE_ENV !== 'test')
  app.use(middleware.requestLogger)

// Routes
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app