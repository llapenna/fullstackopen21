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

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

      handleNotification(`A new blog ${newBlog.title} by ${newBlog.author} added `)
    }
    catch (e) {
      handleNotification(`Can't add ${newBlog.title} to the list: ${e.message}`, 'error')
    }
    
    
    // blogService.create(newBlog)
    //   .then(returnedBlog => {
    //     setBlogs(blogs.concat(returnedBlog))
    //   })
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

          { blogs.map(b => <Blog key={b.id} blog={b} /> )}
        </div>
      : <Login setUser={setUser} handleNotification={handleNotification}/>
      }
    </div>
  )
}

export default App