// core
import { connect } from 'react-redux'

// reducers
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = props => {

  const handleSubmit = async e => {
    e.preventDefault()
    const content = e.target.content.value
    e.target.content.value = ''

    props.newAnecdote(content)
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

const mapDispatchToProps = {
  newAnecdote,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm