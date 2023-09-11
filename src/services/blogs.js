import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const comment = async (id, comment) => {
  console.log('hey')
  const config = {
    headers: {
      Authorization: token,
    },
  }
  console.log(config)
  const response = await axios.post(
    `${baseUrl}/${id}/comments`,
    { content: comment },
    config,
  )
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const updatedBlog = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return updatedBlog.data
}

const remove = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const like = async (id) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.post(`${baseUrl}/${id}/likes`, {},config)
  return response.data
}
export default { getAll, create, setToken, update, remove, comment, like }
