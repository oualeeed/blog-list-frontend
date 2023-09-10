import { useState } from "react"
import { useDispatch } from "react-redux"
import blogService from "../services/blogs"
import { modifyBlog } from "../reducers/blogReducer"
import "./CommentSection.css"
import { useNotify } from "../reducers/notificationReducer"

const CommetnSection = ({ blog }) => {
  const [comment, setComment] = useState('')
  const notifyErr = useNotify('error')
  const dispatch = useDispatch()

  const addComment = (id) => async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.comment(id, comment)
      dispatch(modifyBlog(blog))
      setComment('')
    } catch (error) {
      notifyErr('Sorry there was some error. Please, try again.')
    }
  }

  return (
    <div className="commetns-container">
      <h3 className="comments-title">Comments</h3>
      <form onSubmit={addComment(blog.id)}>
        <input
          className="comment-field"
          onChange={(e) => setComment(e.target.value)}
          type="text"
          value={comment}
          placeholder="What are you thinking about this blog..."
        />
        <button className="comment-button" type="submit">comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => {
          return <p className="comment" key={comment._id}>{comment.content}</p>
        })}
      </ul>
    </div>
  )
}

export default CommetnSection