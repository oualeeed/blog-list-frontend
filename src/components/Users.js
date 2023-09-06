import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Users = () => {
  const users = useSelector((state) => state.users)

  console.log(users)
  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead></thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
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
