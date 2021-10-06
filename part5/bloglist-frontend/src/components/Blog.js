// core
import React, { useState } from 'react'

// styles
import '../styles/blog.css'


const Blog = ({blog, update}) => {

  const [open, setOpen] = useState(false)

  const handleLike = () => {
    //update({...blog, likes: blog.likes + 1})
    update({
      id: blog.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1
    })
  }

  const description = () => (
    <div>
      <p>author: {blog.author}</p>
      <p>url: {blog.url}</p>
      <p>likes: {blog.likes} <button onClick={handleLike}>like</button></p>
    </div>
  )

  return (
    <div className='blog'>
      {blog.title}
      <button onClick={() => setOpen(!open)}>{open ? 'hide' : 'show'}</button>
      { open && description() }
    </div> 
  )
}

export default Blog