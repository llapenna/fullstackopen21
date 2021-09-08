const Blog = require('../models/blog')

const initialBlogs = [
  {
    author: 'Arto Hellas',
    title: 'Fullstack Open',
    url: 'https://fullstackopen.com',
    likes: 2
  },
  {
    author: 'Losha',
    title: 'Homemade Pizza',
    url: 'https://www.simplyrecipes.com/recipes/homemade_pizza',
    likes: 0
  },
  {
    author: 'Vitálik Buterin',
    title: 'Ethereum Documentation',
    url: 'https://ethereum.org/en/developers/docs/',
    likes: 4
  }
]

const testBlog = {
  author: 'temp author',
  title: 'temp title',
  url: 'https://tempauthor.com/temptitle',
  likes: 3,
}

// Returns a valid (in formatting terms) but non existing id
const nonExistingId = async () => {
  const tempBlog = new Blog(testBlog)

  await tempBlog.save()
  await tempBlog.remove()

  return tempBlog._id.toString()
}

module.exports = {
  initialBlogs,
  testBlog,
  nonExistingId
}