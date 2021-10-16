// core
import { useDispatch } from 'react-redux'

// services
import anecdoteService from '../services/anecdotes'

// reducers
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''

    const anecdote = await anecdoteService.create(content)
    dispatch(newAnecdote(anecdote))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name='content'/></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm