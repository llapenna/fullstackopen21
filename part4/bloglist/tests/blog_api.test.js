// imports
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

// models
const Blog = require('../models/blog')

// helper
const helper = require('./helper')

const api = supertest(app)



beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
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

  test('Success with 200 when inserting valid blog', async () => {
    const newBlog = helper.testBlog

    await api.post('/api/blogs').send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await Blog.find({})
    const titles = blogs.map(b => b.title)

    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(newBlog.title)
  })

  test('Fail with 400 when inserting non valid blog', async () => {
    const newBlog = {
      url: 'https://testurl.com',
      likes: 3
    }

    await api.post('/api/blogs').send(newBlog)
      .expect(400)

    const blogs = await Blog.find({})
    expect(blogs).toHaveLength(helper.initialBlogs.length)
  })
})

// Deleting blogs
describe('Deleting blogs', () => {

  test('Success with 204 when id is valid', async () => {

    const startBlogs = await Blog.find({})

    console.log('ID: ', startBlogs[0].id)

    await api.delete(`/api/blogs/${startBlogs[0].id}`)
      .expect(204)

    const finalBlogs = await Blog.find({})
    const titles = finalBlogs.map(b => b.title)

    expect(finalBlogs).toHaveLength(helper.initialBlogs.length - 1)
    expect(titles).not.toContain(startBlogs[0].title)
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