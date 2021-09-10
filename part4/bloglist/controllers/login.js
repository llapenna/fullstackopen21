const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  // We find the corresponding user
  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passHash)

  if (user === null || !passwordCorrect)
    return res.status(401).json({ error: 'Invalid username or password.' })

  const token = jwt.sign(
    { username, id: user._id },
    process.env.JWT_SECRET//,
    //{ expiresIn: 60*60 } // Expires in an hour
  )

  res.status(200).send({ token, username, name: user.name })
})

module.exports = loginRouter