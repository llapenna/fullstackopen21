// eslint-disable-next-line no-unused-vars
const dummy = blogs => {
  return 1
}

const totalLikes = blogs => blogs.reduce((acc, cur) => acc + cur.likes, 0)

const favoriteBlog = blogs => {

  // Spread operator to avoid mutating
  const ordered = [...blogs].sort((a, b) => b.likes - a.likes)

  return blogs.length > 0
    ? {
      title: ordered[0].title,
      author: ordered[0].author,
      likes: ordered[0].likes
    }
    : {}
}

// Exercises 4.6 and 4.7
const mostBlogs = blogs => {
  blogs.map(b => {
    const blogCount = blogs.reduce((acc, cur) => acc + 1 * b.author === cur.author, 0)

    return {
      author: b.author,
      blgos: blogCount
    }
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}