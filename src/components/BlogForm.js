import { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { appendBlog } from '../reducers/blogReducer'
import { useNotify } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [url, setURL] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const dispatch = useDispatch()
  const notifyInfo = useNotify('info')
  const notifyError = useNotify('error')
  const user = useSelector((state) => state.user)

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.create({
        title,
        author,
        url,
      })
      dispatch(appendBlog(createdBlog))
      notifyInfo(`a new blog ${title}! By ${author}`)
      setAuthor('')
      setURL('')
      setTitle('')
    } catch (error) {
      notifyError("something wen't wrong please try again.")
      blogService.setToken(user.token)
    }
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        Title :{' '}
        <input
          type="text"
          value={title}
          id="title"
          placeholder="Title of the article"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author :{' '}
        <input
          type="text"
          value={author}
          id="author"
          placeholder="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL :{' '}
        <input
          type="text"
          value={url}
          id="URL"
          placeholder="url..."
          onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <button id="createButton" type="submit">
        Create
      </button>
    </form>
  )
}

export default BlogForm
