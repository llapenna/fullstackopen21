// imports
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

// models
const User = require('../models/user')

// helper
const helper = require('./helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany([helper.validUser])
})

test('Obtaining token from valid user', async () => {
  await api.post('/api/login')
    .send({ username: 'admin', password: '123456' })
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('Failing to obtain token with unvalid user', async () => {
  await api.post('/api/login')
    .send({ username: 'noadmin', password: '654321' })
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})