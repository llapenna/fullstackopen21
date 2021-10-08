import React, { useState } from 'react'

const BlogForm = ({ create }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async event => {
    event.preventDefault()

    create({ title, author, url })

    // Clear inputs
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreate}>
      <div>
        title <input value={title} onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
        author <input value={author} onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
        url <input value={url} onChange={({ target }) => setUrl(target.value)}/>
      </div>
      <button type='submit'>Create!</button>
    </form>
  )
}

export default BlogForm