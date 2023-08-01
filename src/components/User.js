const User = ({ user, logout }) => {
  return (
  <div>
      <p>{ user.name } is logged in. <button onClick={logout}>logout</button> </p> 
  </div>
  )
}

export default User
