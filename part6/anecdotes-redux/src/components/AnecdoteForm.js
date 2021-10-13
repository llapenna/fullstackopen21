// core
import { useDispatch } from 'react-redux'

// reducers
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''
    dispatch(newAnecdote(content))
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