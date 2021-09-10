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

  test('Success with 201 when creating valid user', async () => {

    const validUser = { username: 'admin', password: '123456' }

    await api.post('/api/users')
      .send(validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await User.find({})
    const usernames = users.map(u => u.username)

    expect(users).toHaveLength(2)
    expect(usernames).toContain('admin')
  })

  test('Invalid username length returns 400', async () => {

    const testUser = {
      username: 'a',
      name: 'a_user',
      password: '123456',
      blogs: []
    }

    await api.post('/api/users').send(testUser)
      .expect(400)

    const finalUsers = await User.find({})

    expect(finalUsers).toHaveLength(1) // We only add one user in the beforeEach()
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

    const finalUsers = await User.find({})

    expect(finalUsers).toHaveLength(1) // We only add one user in the beforeEach()
  })
})


afterAll(() => {
  mongoose.connection.close()
})