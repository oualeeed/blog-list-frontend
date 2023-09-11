import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { removeBlog, upvoteBlog } from '../reducers/blogReducer'
import { useNotify } from '../reducers/notificationReducer'
import './BlogView.css'
import CommetnSection from './CommentSection'

const BlogView = () => {
  const id = useParams().id
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  )
  const notify = useNotify('info')
  const notifyErr = useNotify('error')
  const navigate = useNavigate()

  const likeABlog = (id) => {
    return () => {
      console.log('hello')
      dispatch(upvoteBlog(id))
    }
  }

  const deleteBlog = (id) => () => {
    try {
      dispatch(removeBlog(id))
      notify('The Blog has been deleted')
      setTimeout(() => navigate('/'), 5000)
    } catch (error) {
      notifyErr('something went wrong. Please, try again.')
    }
  }



  if (!blog) return null

  return (
    <div className='blog-container'>
      <div className='blog-post'>
        <h2 className='blog-title'>{blog.title}</h2>
        <div className='blog-details'>
          You can read the blog
          <a target="_blank" href={blog.url} rel="noreferrer">here</a>
        </div>
        <button className="blog-like-button" onClick={likeABlog(blog.id)}>
          <i className="fa-solid fa-up-long"></i>
        </button>
        <div className='blog-likes'>
          {blog.likes} likes
        </div>
        <p className='blog-user'>
          Added by
          <Link className="blog-user-link" to={`/users/${blog.user.id}`}>
            {blog.user.name}
          </Link>
        </p>
        {user.name === blog.user.name && (
          <button className='blog-remove-button' onClick={deleteBlog(blog.id)}>X</button>
        )}
        <CommetnSection blog={blog} />
      </div>
    </div>
  )
}

export default BlogView
