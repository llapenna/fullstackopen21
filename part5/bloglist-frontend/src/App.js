import React, { useState, useEffect, useRef } from 'react'

// services
import blogService from './services/blogs'

// components
import Notification from './components/Notification'
import Login from './components/Login'

import BlogForm from './components/BlogForm'
import Blog from './components/Blog'

import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notif, setNotif] = useState(null)

  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll()
      .then(newBlogs => setBlogs(newBlogs))   
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async newBlog => {

    try {
      const returnedBlog = await blogService.create(newBlog)

      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggle()

      handleNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`)
    }
    catch (e) {
      handleNotification(`Can't add ${newBlog.title} to the list: ${e.message}`, true)
    }
  }

  const updateBlog = async newBlog => {
    try {
      await blogService.update(newBlog)
      // const otherBlogs = blogs.filter(({id}) => id !== newBlog.id)      
      // setBlogs([...otherBlogs, returnedBlog])

      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);

      handleNotification(`Blog ${newBlog.title} by ${newBlog.author} updated`)
    } catch (e) {
      handleNotification(`Can't update ${newBlog.title}: ${e.message}`, true)
    }
  }
  const deleteBlog = async blog => {
    try {
      await blogService.remove(blog.id)

      const updatedBlogs = await blogService.getAll();
      setBlogs(updatedBlogs);

      handleNotification(`Blog ${blog.title} by ${blog.author} deleted`)
    } catch (e) {
      handleNotification(`Can't delete ${blog.title}: ${e.message}`, true)
    }
  }

  const handleNotification = (text, error = false) => {
    setNotif({text, status: error ? 'error' : 'success'})

    setTimeout(() => setNotif(null), 5000)
  }

  const blogForm = () => (
    <Togglable text='new blog' ref={blogFormRef}>
      <BlogForm create={addBlog} handleNotification={handleNotification}/>
    </Togglable>
  )

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notif}/>

      { user
      ? 
        <div>
          <div>
            {`User ${user.name} logged in`}
            <button onClick={handleLogout}>Logout</button>
          </div>

          <br />

          { blogForm() }

          <br />

          { blogs.map(b => <Blog key={b.id} blog={b} update={updateBlog} remove={deleteBlog} /> )}
        </div>
      : <Login setUser={setUser} handleNotification={handleNotification}/>
      }
    </div>
  )
}

export default App