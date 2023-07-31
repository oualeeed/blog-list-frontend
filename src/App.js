import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import './style.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
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
      setBlogs( blogs )
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
    loginService.logout()
    setUser(null)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.create({
        title, author, url
      })
      setBlogs(blogs.concat(createdBlog))
      setAuthor('')
      setTitle('')
      setURL('')
      notify(`a new blog ${title}! By ${author}`, INFO)
    } catch(error){
      notify('something wen\'t wrong please try again.', ERROR)
      blogService.setToken(user.token)
    }

  }

  const ERROR = 'error'
  const INFO = 'info'
  const notify = (message, type) => {
    setNotification(message)
    setNotificationType(type)
    setTimeout(()=> {
      setNotification('')
    }, 5000)
  }



  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={ notification } type={notificationType}/>
        <form onSubmit={login}>
          <div>
            username : <input 
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password : <input
            type='text'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={ notification } type={notificationType}/>
      <User user={user} logout={logout} />
      <form onSubmit={createBlog}>
        <div>
          Title : <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author : <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL : <input
          type='text'
          value={url}
          name='URL'
          onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
