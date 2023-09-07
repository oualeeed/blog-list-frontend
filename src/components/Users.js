import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Users.css'

const Users = () => {
  const users = useSelector((state) => state.users)

  let index = 0
  return (
    <div className='users-container'>
      <h3 className='users-title'>Users</h3>
      <p className='amazing-users'>These users are amazing.</p>
      <table>
        <thead>
        </thead>
        <tbody>
          <tr>
            <th>
              Index
            </th>
            <th>
              Username
            </th>
            <th>
              Created blogs
            </th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td className='user-index'>
                {index++} )
              </td>
              <td>
                <Link className='username' to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  )
}

export default Users
