import { useState } from "react"

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)
  
  const hideWhenVisble = {display : visible ? 'none' : ''}
  const showWhenVisble = {display : visible ? '' : 'none'}

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
    <div style={hideWhenVisble}>
      {blog.title} by {blog.author} 
      <button onClick={toggleVisibility}>view</button>
    </div>
    <div style={showWhenVisble}>
      {blog.title} by {blog.author} <br />
      {blog.url} <br />
      likes {blog.likes} <button>like</button><br />
      { (blog.user !== undefined ) && blog.user.username } <br />  
      <button onClick={toggleVisibility}>hide</button>
    </div>
  </div>  
)}

export default Blog