import { useDispatch, useSelector } from 'react-redux'
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
    <div>
      <p>
        {user.name} is logged in. <button onClick={logout}>logout</button>{' '}
      </p>
    </div>
  )
}

export default User
