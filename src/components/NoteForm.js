import { useState } from 'react'


const BlogForm = ({ createBlog }) => {
  const [url, setURL] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    if ( await createBlog({ title, author, url }) ){
      setAuthor('')
      setTitle('')
      setURL('')
    }
  }
  return (
    <form onSubmit={addBlog}>
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
  )
}

export default BlogForm
