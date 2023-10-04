/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Notification from './Notification'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useNotify } from '../reducers/notificationReducer'
import './LoginForm.css'
import userService from '../services/users'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [visibleName, setVisibleName] = useState('none')
  const [createAccount, setCreateAccount] = useState(['Create Account', 'Log in'])
  const dispatch = useDispatch()
  const notifyError = useNotify('error')
  const notifyInfo = useNotify('info')

  const handleLogin = async (event) => {
    event.preventDefault()
    if (createAccount[1] === 'Create Account') {
      const credentials = {
        name, username, password
      }
      return handleCreateAccount(credentials)
    }
    const credentials = {
      username,
      password,
    }
    try {
      await dispatch(loginUser(credentials))
    } catch (error) {
      notifyError('Wrong username or password')
    }
  }

  const handleCreateAccount = async (credentials) => {
    try {
      await userService.createAccount(credentials)
      notifyInfo('Create a user successfully 🎉')
      createAccountLink()
    } catch (error) {
      notifyError('Something went wrong please try again 😷')
    }
  }

  const createAccountLink = () => {
    visibleName === 'none'
      ? setVisibleName('inline')
      : setVisibleName('none')
    setCreateAccount(createAccount.reverse())
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
            value={name}
            id="name"
            placeholder="name"
            onChange={({ target }) => setName(target.value)}
            style={{
              display: visibleName
            }}
          />
        </div>
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
        <button className="login-form-button" type="submit">{createAccount[1]}</button>
        <div className='create-account-link' onClick={createAccountLink}>{createAccount[0]}</div>
      </form>
    </div>
  )
}

export default LoginForm
