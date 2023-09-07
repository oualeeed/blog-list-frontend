import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { modifyBlog, removeBlog, upvoteBlog } from '../reducers/blogReducer'
import { useNotify } from '../reducers/notificationReducer'
import { useState } from 'react'
import blogService from '../services/blogs'

const BlogView = () => {
  const id = useParams().id
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  )
  const [comment, setComment] = useState('')
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

  const addComment = (id) => async (event) => {
    event.preventDefault()
    const blog = await blogService.comment(id, comment)
    dispatch(modifyBlog(blog))
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
      {user.name === blog.user.name && (
        <button onClick={deleteBlog(blog.id)}>remove</button>
      )}
      <h3>Comments</h3>
      <form onSubmit={addComment(blog.id)}>
        <input
          onChange={(e) => setComment(e.target.value)}
          type="text"
          value={comment}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => {
          return <li key={comment._id}>{comment.content}</li>
        })}
      </ul>
    </div>
  )
}

export default BlogView
