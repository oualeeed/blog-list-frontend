import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './BlogList.css'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const blogsToshow = [...blogs]
  blogsToshow.sort((a, b) => {
    return b.likes - a.likes
  })

  let i = 0

  return (
    <div className="container-blogs">
      <Togglable buttonLabel="+">
        <BlogForm />
      </Togglable>
      <div className="blog-list">
        {blogsToshow.map((blog) => (
          <Link className='blog-link' key={blog.id} to={`/blogs/${blog.id}`}>
            <div className="blog-item" >
              <p className='blog-title' >
                <span className='blog-index'>{++i}.</span>
                <span className='blog-title-text'>
                  {blog.title} by {blog.author}
                </span>
              </p>
              <div className='blog-upvotes'>
                { blog.likes } upvotes | Added by <span>{blog.user.username}</span> | {blog.comments.length} comments
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogList
