import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
  return axios.get(baseUrl).then((response) => response.data)
}

const createAccount = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const userService = { getAll, createAccount }
export default userService
