// core
import { useDispatch, useSelector } from "react-redux"

// reducers
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

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
  const anecdotes = useSelector(({anecdotes, filter}) => {
    const filteredAnecdotes = filter === null
      ? anecdotes
      : anecdotes.filter(({content}) => content.toLowerCase().includes(filter.toLowerCase()))

    const sortedAnecdotes = filteredAnecdotes.sort((a,b) => b.votes - a.votes)

    return sortedAnecdotes
  })

  const handleVote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
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