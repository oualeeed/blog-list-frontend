import axios from 'axios'

const login = async ({ username, password }) => {
  const response = await axios.post('/api/login', { username, password })
  window.localStorage.setItem(
    'loggedInUser', JSON.stringify(response.data)
  )
  return response.data
}

const logout = () => {
  window.localStorage.removeItem('loggedInUser')
}

export default { login, logout }
