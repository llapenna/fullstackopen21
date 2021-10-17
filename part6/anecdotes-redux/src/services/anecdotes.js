import axios from 'axios'
const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(url)
  return res.data
}

const create = async content => {
  const anecdote = {
    content,
    votes: 0,
  }
  const res = await axios.post(url, anecdote)

  return res.data
}

const update = async (id, newAnecdote) => {
  const res = await axios.put(`${url}/${id}`, newAnecdote)
  
  return res.data
}

const service = {
  getAll,
  create,
  update
}
export default service