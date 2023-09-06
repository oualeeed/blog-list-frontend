import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = () => {
  const users = useSelector((state) => state.users)
  const { id } = useParams()
  const user = users.find((user) => user.id === id)

  if (!user) return null
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserView
