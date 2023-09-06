import { useEffect, useState } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
  }, [])

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
