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

  for(let blog of helper.initialBlogs) {
    await new Blog(blog).save()
  }
})

describe('Blogs API', () => {

  // GET /api/blogs
  test('Correct number of blogs', async () => {
    const res =
      await api.get('/api/blogs/')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(res.body.length).toBe(3)
  })
  // GET /api/blogs
  test('Does have id', async () => {
    const res =
      await api.get('/api/blogs/')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(res.body[0].id).toBeDefined()
  })

  // POST /api/blogs
  test('Creation of a valid blog', async () => {
    const newBlog = {
      author: 'test author',
      title: 'test blog',
      url: 'https://testauthor.com/testblog/',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const res = await api.get('/api/blogs')

    const blogs = res.body.map(b => b.title)

    expect(blogs.length).toBe(helper.initialBlogs.length + 1)
    expect(blogs).toContain(newBlog.title)
  })
  // POST /api/blogs
  test('New blog with no likes', async () => {
    const newBlog = {
      author: 'test author',
      title: 'test blog',
      url: 'https://testauthor.com/testblog/'
    }

    const res =
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    expect(res.body.likes).toBeDefined()
    expect(res.body.likes).toBe(0)
  })
  // POST /api/blogs
  test('New blog with no author or title', async () => {
    const newBlog = {
      author: 'test author',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

})


afterAll(() => {
  mongoose.connection.close()
})