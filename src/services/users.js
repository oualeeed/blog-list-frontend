import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
  return axios.get(baseUrl).then((response) => response.data)
}

const userService = { getAll }
export default userService
