import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, upvoteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisble = { display : visible ? 'none' : '' }
  const showWhenVisble = { display : visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)
  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={style}>
      <div style={hideWhenVisble} className='blog-shrinked'>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisble} className='blog-expanded'>
        {blog.title} by {blog.author} <br />
        {blog.url} <br />
      likes {blog.likes} <button onClick={upvoteBlog(blog)}>like</button><br />
        { (blog.user !== undefined ) && blog.user.username } <br />
        <button onClick={toggleVisibility}>hide</button>
      </div>
    </div>
  )}

Blog.prototype = {
  blog: PropTypes.object.isRequired,
  upvoteBlog: PropTypes.func.isRequired,
}

export default Blog