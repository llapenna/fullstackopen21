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

const service = {
  getAll,
  create
}
export default service