// core
import { useDispatch, useSelector } from "react-redux"

// reducers
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, hideNotification } from "../reducers/notificationReducer"

const AnecdoteFilter = () => {
  return (
    <div>
    </div>
  )
}

const Anecdote = ({anecdote, handleVote}) => {

  return (
  <div>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes} votes
      <button onClick={handleVote}>vote</button>
      </div>
  </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes.sort((a,b) => b.votes - a.votes))

  const handleVote = anecdote => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`You voted for '${anecdote.content}'`))

    // After 5s, the notification hides
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(a => 
        <Anecdote 
          key={a.id} 
          anecdote={a} 
          handleVote={() => handleVote(a)}
        />
      )}
    </div>
    
  )
}

export default AnecdoteList