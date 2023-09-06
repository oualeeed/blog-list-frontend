import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const blogsToshow = [...blogs]

  const style = {
    border: '1px solid black',
    padding: '5px',
    margin: '0',
  }

  return (
    <div>
      <Togglable buttonLabel="create a note">
        <BlogForm />
      </Togglable>
      {blogsToshow
        .sort((a, b) => {
          return b.likes - a.likes
        })
        .map((blog) => (
          <p style={style} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </p>
        ))}
    </div>
  )
}

export default BlogList
