require('dotenv').config()

const PORT = process.env.PORT

const uri = {
  'prod': process.env.MONGODB_URI,
  'dev': process.env.DEV_MONGODB_URI,
  'test': process.env.TEST_MONGODB_URI,
}

const MONGODB_URI = uri[process.env.NODE_ENV]

module.exports = {
  MONGODB_URI,
  PORT
}