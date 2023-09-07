import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Notification from './components/Notification'
//import Blog from './components/Blog'
import User from './components/User'
import Users from './components/Users'
import UserView from './components/UserView'
import BlogList from './components/BlogList'
//import BlogForm from './components/BlogForm'
// import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import userService from './services/users'
import { setUsers } from './reducers/usersReducer'
import BlogView from './components/BlogView'

const App = () => {
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

  if (user === null) {
    return <LoginForm />
  }

  return (
    <Router>
      <div className="main">
        <header className="header">
          <div className="navigation-links">
            <h2 className="brand">
              <Link className="brand" to="/">
                Geeks and Blogs
              </Link>
            </h2>
            <Link className="link" to="/">
              Blogs
            </Link>
            <Link className="link" to="/users">
              Users
            </Link>
          </div>
          <User />
        </header>
        <Notification />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserView />} />
          <Route path="/blogs/:id" element={<BlogView />} />
        </Routes>
        <footer className='footer'>
          <span className='copy'>&copy;</span>
          Oualid El-feraoui, 2023. Open source on
          <a target="_blank" href="https://github.com/z3aibila/blog-list-frontend" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
        </footer>
      </div>
    </Router>
  )
}

export default App
