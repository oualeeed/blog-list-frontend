import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import './UserView.css'

const UserView = () => {
  const users = useSelector((state) => state.users)
  const { id } = useParams()
  const user = users.find((user) => user.id === id)

  if (!user) return null
  return (
    <div className='user-container'>
      <div className='user-frame'>
        <h2 className='user-title'>{user.name} ({user.username})</h2>
        <h3>Added blogs</h3>
        <ul>
          {user.blogs.map((blog) => (
            <Link className='user-link-to-blog' key={blog.id}>{blog.title}</Link>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UserView
