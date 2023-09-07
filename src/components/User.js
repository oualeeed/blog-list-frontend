import { useDispatch, useSelector } from 'react-redux'
import './User.css'
import loginService from '../services/login'
import { setUser } from '../reducers/userReducer'

const User = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const logout = (event) => {
    event.preventDefault()
    loginService.logout()
    dispatch(setUser(null))
  }

  return (
    <div className="logged-in-user">
      <p className="logged-in-user-name">{user.name} is logged in</p>
      <div>
        <button className="logout-button" onClick={logout}>
          logout
        </button>
      </div>
    </div>
  )
}

export default User
