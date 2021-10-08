// core
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// styles
import '../styles/blog.css'


const Blog = ({ blog, update, remove }) => {

  const [open, setOpen] = useState(false)

  const handleLike = async() => {
    await update({
      id: blog.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    })
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`))
      await remove(blog)
  }

  const description = () => (
    <div className='blog-description' style={{ display: open ? '' : 'none' }}>
      <p>author: {blog.author}</p>
      <p>url: {blog.url}</p>
      <p>likes: {blog.likes} <button className='like-button' onClick={handleLike}>like</button></p>
      <button onClick={handleDelete}>remove</button>
    </div>
  )

  return (
    <div className='blog'>
      {blog.title}
      <button onClick={() => setOpen(!open)}>{open ? 'hide' : 'show'}</button>
      { description() }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export default Blog