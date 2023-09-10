import { useState } from 'react'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useNotify } from '../reducers/notificationReducer'
import './LoginForm.css'

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
    <div className='login-form-container'>
      <h1 className='login-form-title'>(Geeks && Blogs)</h1>
      <Notification />
      <form className='login-form' onSubmit={handleLogin}>
        <span className='login-to-the-app'>Log in to the Application</span>
        <div className='login-form-text-field'>
          <input
            className='login-form-text-field-input'
            type="text"
            value={username}
            id="username"
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div className='login-form-text-field'>
          <input
            className='login-form-text-field-input'
            type="text"
            value={password}
            id="password"
            placeholder="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="login-fomr-button" type="submit">log in</button>
      </form>
    </div>
  )
}

export default LoginForm
