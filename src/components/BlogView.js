import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { removeBlog, upvoteBlog } from '../reducers/blogReducer'
import { useNotify } from '../reducers/notificationReducer'

const BlogView = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  )
  const notify = useNotify('info')
  const notifyErr = useNotify('error')
  const navigate = useNavigate()

  const likeABlog = (blog) => () => dispatch(upvoteBlog(blog))

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
    <div>
      <h2>{blog.title}</h2>
      <a target="_blank" href={blog.url} rel="noreferrer">
        {blog.url}
      </a>
      <p>{blog.likes} likes</p> <button onClick={likeABlog(blog)}>like</button>
      <p>Added by {blog.user.name}</p>
      <button onClick={deleteBlog(blog.id)}>remove</button>
    </div>
  )
}

export default BlogView
