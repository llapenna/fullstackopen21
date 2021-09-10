// imports
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

// models
const Blog = require('../models/blog')
const User = require('../models/user')

// helper
const helper = require('./helper')

const api = supertest(app)


const simulateLogin = async (user = { username: 'admin', password: '123456' }) => {
  const { body: { token } } = await api
    .post('/api/login')
    .send(user)
    .expect(200)

  return token
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const user = new User(helper.validUser)
  await user.save()

  // We make the user the owner of the blogs
  for (let blog of helper.initialBlogs)
    blog.user = user._id

  await Blog.insertMany(helper.initialBlogs)

  // We add the blogs to the user
  const blogs = await Blog.find({})
  for (let blog of blogs)
    user.blogs = user.blogs.concat(blog._id.toString())

  await user.save()

  // At last we add another user (for DELETE and PUT requests)
  const anotherUser = new User({ ...helper.validUser, username: 'nonadmin' })
  await anotherUser.save()
})

// Initial DB's state
describe('At the database initial state', () => {

  test('All blogs are returned', async () => {

    const res = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })

  test('A specefic blog is returned', async () => {
    const res = await api.get('/api/blogs')

    const blogsTitles = res.body.map(b => b.title)

    expect(blogsTitles).toContain(helper.initialBlogs[1].title)
  })
})

// Getting one blog
describe('Inspecting one blog', () => {

  test('Success with 200 with valid id', async () => {
    const initialState = await Blog.find({})
    const blogToInspect = initialState[1]

    const res = await api.get(`/api/blogs/${blogToInspect.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlog = JSON.parse(JSON.stringify(blogToInspect))

    expect(res.body).toEqual(processedBlog)
  })

  test('Fails with 404 with non existing id', async () => {
    const id = await helper.nonExistingId()

    await api.get(`/api/blogs/${id}`)
      .expect(404)
  })

  test('Fails with 400 when id is not correctly formatted', async () => {
    const id = '0123456789abcdef'

    await api.get(`/api/blogs/${id}`)
      .expect(400)
  })
})

// Adding new blogs
describe('Adding new blogs', () => {

  test('Success with 201 when inserting valid blog', async () => {
    const token = await simulateLogin()

    await api.post('/api/blogs')
      .send(helper.testBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await Blog.find({})
    const titles = blogs.map(b => b.title)

    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(helper.testBlog.title)
  })

  test('A user is added to the blog when creating one', async () => {
    const token = await simulateLogin()

    const { body: { user } } = await api.post('/api/blogs')
      .send(helper.testBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(201)

    expect(user).toBeDefined()
  })

  test('Fail with 400 when inserting non valid blog', async () => {
    const token = await simulateLogin()

    const newBlog = {
      url: 'https://testurl.com',
      likes: 3
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .expect(400)

    const blogs = await Blog.find({})
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })

  test('Fail with 401 when no token is sent', async () => {
    await api.post('/api/blogs')
      .send(helper.testBlog)
      .expect(401)
  })
})

// Deleting blogs
describe('Deleting blogs', () => {

  test('Success with 204 when id is valid', async () => {
    const token = await simulateLogin()

    const startBlogs = await Blog.find({})

    await api.delete(`/api/blogs/${startBlogs[0].id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const finalBlogs = await Blog.find({})
    const titles = finalBlogs.map(b => b.title)

    expect(finalBlogs).toHaveLength(helper.initialBlogs.length - 1)
    expect(titles).not.toContain(startBlogs[0].title)
  })

  test('Fail with 404 when id is not valid', async () => {
    const blogId = await helper.nonExistingId()
    const token = await simulateLogin()

    await api.delete(`/api/blogs/${blogId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(404)
  })

  test('Fail with 403 when user is not the owner', async () => {
    const token = await simulateLogin({ username: 'nonadmin', password: '123456' })

    // Any of the users works, because all of them were created under user 'admin'
    const blogs = await Blog.find({})

    await api.delete(`/api/blogs/${blogs[0].id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(403)
  })
})

// Updating a blog
describe('Updating a blog', () => {

  test('Success with 201 when data is valid', async () => {
    const blogs = await Blog.find({})
    const id = blogs[0].id

    const newBlog = helper.testBlog

    await api.put(`/api/blogs/${id}`).send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedBlog = await Blog.findById(id)
    const processedUpdated = JSON.parse(JSON.stringify(updatedBlog))

    expect(processedUpdated).toEqual({ ...newBlog, id })
  })
})

afterAll(() => {
  mongoose.connection.close()
})