import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => token = `bearer ${newToken}`

const getAll = async (sort = true) => {
  const request = await axios.get(baseUrl)

  return sort ? request.data.sort((a, b) => b.likes - a.likes) : request.data
}

const create = async newBlog => {
  const config = {
    headers: { 'Authorization': token }
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const update = async newBlog => {
  const config = {
    headers: { 'Authorization': token }
  }

  const res = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config)
  return res.data
}

const service = {
  getAll,
  setToken,
  create,
  update
}
export default service