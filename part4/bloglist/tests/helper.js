const Blog = require('../models/blog')
const User = require('../models/user')

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

const validUser = {
  username: 'admin',
  name: 'ADMIN',
  passHash: '$2b$10$gQROmkmbe5BgFDs9IX/FuOTpffcYEs9YWPrfogoq9ulTKCV.WRLtK',
  blogs: [],
}

const testBlog = {
  author: 'temp author',
  title: 'temp title',
  url: 'https://tempauthor.com/temptitle',
  likes: 3,
  // user is added with the corresponding POST request
}

// Returns a valid (in formatting terms) but non existing id
const nonExistingId = async () => {
  const tempBlog = new Blog(testBlog)

  // We add the user to simulate a correct blog creation
  const anyUser = await User.findOne({})
  tempBlog.user = anyUser._id

  await tempBlog.save()
  await tempBlog.remove()

  return tempBlog._id.toString()
}

const bearerWith = token => `bearer ${token}`

module.exports = {
  validUser,
  initialBlogs,
  testBlog,
  nonExistingId,
  bearerWith
}