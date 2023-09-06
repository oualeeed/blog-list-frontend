import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import Notification from './components/Notification'
import Blog from './components/Blog'
import User from './components/User'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useNotify } from './reducers/notificationReducer'
import { initializeBlogs, setBlogs } from './reducers/blogReducer'
import { loginUser, setUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const notify = useNotify('error')

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON !== null) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

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

  const logout = (event) => {
    event.preventDefault()
    loginService.logout()
    dispatch(setUser(null))
  }

  const createBlog = async ({ title, author, url }) => {
    try {
      const createdBlog = await blogService.create({
        title,
        author,
        url,
      })
      setBlogs(blogs.concat(createdBlog))
      notify(`a new blog ${title}! By ${author}`, INFO)
      return true
    } catch (error) {
      notify("something wen't wrong please try again.", ERROR)
      blogService.setToken(user.token)
      return false
    }
  }

  const ERROR = 'error'
  const INFO = 'info'

  let blogsToshow = [...blogs]
  blogsToshow.sort((a, b) => {
    return b.likes - a.likes
  })

  if (user === null) {
    const center = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }
    return (
      <div style={center}>
        <div className="login-div">
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
            <div className="container-center">
              <button type="submit">log in</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <User user={user} logout={logout} />
      <Notification />
      <Togglable buttonLabel="create a note">
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogsToshow.map((blog) => {
        return <Blog key={blog.id} blog={blog} user={user} />
      })}
    </div>
  )
}

export default App
