// core
import { useState } from 'react'

// services
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({setUser, handleNotification}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChangeUsername = ({target}) => setUsername(target.value)
  const handleChangePassword = ({target}) => setPassword(target.value)

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})

      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      console.log('Logged user: ', user)
    } catch (e) {
      handleNotification('Wrong credentials', true)
    }
    
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username <input value={username} onChange={handleChangeUsername} />
        </div>
        <div>
          password <input value={password} onChange={handleChangePassword} type='password'/>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login