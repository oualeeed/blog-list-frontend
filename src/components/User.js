const User = ({ user, logout }) => {
  return (
  <div>
      <p>{ user.name } is logged in.</p>
      <button onClick={logout}>logout</button>
  </div>
  )
}

export default User
