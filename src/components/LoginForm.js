import { useState } from 'react'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useNotify } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const notify = useNotify('error')

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username,
      password,
    }
    try {
      await dispatch(loginUser(credentials))
    } catch (error) {
      notify('Wrong username or password')
      console.log('hello')
    }
  }

  return (
    <div>
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="text"
              value={username}
              id="username"
              placeholder="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              value={password}
              id="password"
              placeholder="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">log in</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
