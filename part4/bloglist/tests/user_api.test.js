// imports
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

// models
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {

  await User.deleteMany({})

  const testUser = new User({
    username: 'testuser',
    name: 'user',
    passHash: '123456',
    blogs: []
  })

  await testUser.save()
})


describe('Creating new user', () => {

  test('Invalid username length returns 400', async () => {
    const testUser = {
      username: 'a',
      name: 'a_user',
      password: '123456',
      blogs: []
    }

    await api.post('/api/users').send(testUser)
      .expect(400)
  })

  test('Inserting non unique username returns 400', async () => {
    // Same user created in the beforEach
    const testUser = {
      username: 'testuser',
      name: 'user',
      password: '123456',
      blogs: []
    }

    await api.post('/api/users').send(testUser)
      .expect(400)
  })
})


afterAll(() => {
  mongoose.connection.close()
})