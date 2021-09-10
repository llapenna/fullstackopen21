const logger = require('./logger')
const morgan = require('morgan')

const jwt = require('jsonwebtoken')

morgan.token('body', req => JSON.stringify(req.body))
const requestLogger = morgan(':method :url :status :res[content-length]B :body -- :response-time ms')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (req, res, next) => {

  const auth = req.get('authorization')

  req.token = auth && auth.startsWith('bearer')
    ? auth.substring(7)
    : null

  next()
}

const userExtractor = (req, res, next) => {
  const auth = req.get('authorization')

  const token = auth && auth.startsWith('bearer')
    ? auth.substring(7)
    : null
  const user = jwt.verify(token, process.env.JWT_SECRET)

  if (!token || !user.id)
    return res.status(401).json({ error: 'token missing or invalid' })

  req.user = user

  next()
}


const errorHandler = (e, req, res, next) => {
  logger.error(e.message)

  if (e.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id.' })

  } else if (e.name === 'ValidationError') {
    return res.status(400).json({ error: e.message })

  } else if (e.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token.' })

  } else if (e.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }

  next(e)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}