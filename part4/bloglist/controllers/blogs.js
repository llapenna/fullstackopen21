const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()

  response.status(201).json(result)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog)
    res.json(blog)
  else
    res.status(404).end()
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id

  const result = await Blog.findByIdAndRemove(id)

  res.status(result ? 204 : 404).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const newBlogs = req.body

  const result = await Blog
    .findByIdAndUpdate(id, newBlogs, { new: true, runValidators: true })

  res.status(201).json(result)
})

module.exports = blogsRouter