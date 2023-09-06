import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.css'
import Notification from './components/Notification'
//import Blog from './components/Blog'
import User from './components/User'
import Users from './components/Users'
import UserView from './components/UserView'
import Blog from './components/Blog'
//import BlogForm from './components/BlogForm'
// import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import userService from './services/users'
import { setUsers } from './reducers/usersReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

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

  useEffect(() => {
    userService.getAll().then((users) => dispatch(setUsers(users)))
  }, [])

  let blogsToshow = [...blogs]
  blogsToshow.sort((a, b) => {
    return b.likes - a.likes
  })

  if (user === null) {
    return <LoginForm />
  }

  // <Togglable buttonLabel="create a note">
  // <BlogForm />
  // </Togglable>
  // {blogsToshow.map((blog) => {
  //   return <Blog key={blog.id} blog={blog} user={user} />
  // })}

  return (
    <Router>
      <div>
        <h2>Blogs</h2>
        <User />
        <Notification />
        <Routes>
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
