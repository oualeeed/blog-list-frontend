import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import Notification from './components/Notification'
import Blog from './components/Blog'
import User from './components/User'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { useNotify } from './reducers/notificationReducer'
import { initializeBlogs, setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import loginService from './services/login'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const notifyInfo = useNotify('info')
  const notifyError = useNotify('error')

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

  const logout = (event) => {
    event.preventDefault()
    loginService.logout()
    dispatch(setUser(null))
  }

  let blogsToshow = [...blogs]
  blogsToshow.sort((a, b) => {
    return b.likes - a.likes
  })

  if (user === null) {
    return <LoginForm />
  }

  return (
    <div>
      <h2>Blogs</h2>
      <User user={user} logout={logout} />
      <Notification />
      <Togglable buttonLabel="create a note">
        <BlogForm />
      </Togglable>
      {blogsToshow.map((blog) => {
        return <Blog key={blog.id} blog={blog} user={user} />
      })}
    </div>
  )
}

export default App
