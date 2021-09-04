const logger = require('./logger')
const morgan = require('morgan')

morgan.token('body', req => JSON.stringify(req.body))
const requestLogger = morgan(':method :url :status :res[content-length] :body -- :response-time ms - ')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (e, req, res, next) => {
  logger.error(e.message)

  if (e.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (e.name === 'ValidationError') {
    return res.status(400).json({ error: e.message })
  }

  next(e)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}