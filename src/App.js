import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

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
      
    }
  }

  const logout = (event) => {
    loginService.logout()
    setUser(null)
  }

  const createBlog = async (event) => {
    event.preventDefault()
    const createdBlog = await blogService.create({
      title, author, url
    })
    setBlogs(blogs.concat(createdBlog))
    setAuthor('')
    setTitle('')
    setURL('')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
