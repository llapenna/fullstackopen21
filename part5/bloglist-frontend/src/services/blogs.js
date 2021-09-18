import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => token = `bearer ${newToken}`

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newBlog => {
  const config = {
    headers: { 'Authorization': token }
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const service = {
  getAll,
  setToken,
  create
}
export default service