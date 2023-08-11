import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import User from './components/User'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './style.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON !== null ){
      const loggedInUser = JSON.parse(loggedInUserJSON)
      setUser(loggedInUser)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const login = async (event) => {
    event.preventDefault()
    const credentials = {
      username,
      password,
    }
    try{
      const response = await loginService.login(credentials)
      setUser(response)
      blogService.setToken(response.token)
      setUsername('')
      setPassword('')
    }catch(error){
      notify('Wrong username or password', ERROR)
    }
  }

  const logout = (event) => {
    event.preventDefault()
    loginService.logout()
    setUser(null)
  }

  const createBlog = async ({ title, author, url }) => {
    try {
      const createdBlog = await blogService.create({
        title, author, url
      })
      setBlogs(blogs.concat(createdBlog))
      notify(`a new blog ${title}! By ${author}`, INFO)
      return true
    } catch(error){
      notify('something wen\'t wrong please try again.', ERROR)
      blogService.setToken(user.token)
      return false
    }
  }

  const upvoteBlog = (blog) => async () => {

    const updatedBlog = {
      ...blog,
      likes : blog.likes + 1
    }
    const response = await blogService.update(updatedBlog)
    setBlogs(blogs.map((blog) => blog.id === response.id ? response : blog))
  }

  const ERROR = 'error'
  const INFO = 'info'
  const notify = (message, type) => {
    setNotification(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

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
        <div className='login-div'>
          <h2>Log in to application</h2>
          <Notification notification={ notification } type={notificationType}/>
          <form onSubmit={login}>
            <div>
              <input
                type='text'
                value={username}
                name='Username'
                placeholder='username'
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              <input
                type='text'
                value={password}
                name='Password'
                placeholder='password'
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <div className='container-center'>
              <button type='submit'>login</button>
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
      <Notification notification={ notification } type={notificationType}/>
      <Togglable  buttonLabel='create a note'>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
      {blogsToshow.map(blog => {
        return (
          <Blog key={blog.id} blog={blog} upvoteBlog={upvoteBlog} />
        )
      })}
    </div>
  )
}

//<Blog key={blog.id} blog={blog} />
export default App
