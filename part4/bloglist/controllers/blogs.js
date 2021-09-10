const blogsRouter = require('express').Router()

// models
const Blog = require('../models/blog')
const User = require('../models/user')

// middleware
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const userId = request.user.id

  const user = await User.findById(userId)
  const blog = new Blog({ ...request.body, user: userId })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result.id)
  await user.save()

  response.status(201).send(result)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog)
    res.json(blog)
  else
    res.status(404).end()
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const userId = req.user.id
  const blogId = req.params.id

  const blog = await Blog.findById(blogId)

  // No blog was not found
  if (!blog)
    return res.status(404).end()

  // The user is the owner of the blog
  if (blog.user.toString() === userId) {
    await blog.remove()
    return res.status(204).end()
  }
  else
    return res.status(403).end()
})

blogsRouter.put('/:id', userExtractor, async (req, res) => {
  const user = req.user
  const blogId = req.params.id
  const newBlog = req.body

  const oldBlog = await Blog.findById(blogId)

  // No blog was not found
  if (!oldBlog)
    return res.status(404).end()

  // The user is the owner of the blog
  if (oldBlog.user.toString() === user.id) {
    const updated = await Blog
      .findByIdAndUpdate(blogId, newBlog, { new: true, runValidators: true })
    return res.status(201).send(updated)
  }
  else
    return res.status(403).end()
})

module.exports = blogsRouter