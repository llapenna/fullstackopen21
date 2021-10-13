// core
import { useDispatch, useSelector } from "react-redux"

// reducers
import { voteAnecdote } from "../reducers/anecdoteReducer"

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

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.sort((a,b) => b.votes - a.votes))

  return (
    anecdotes.map(a => 
      <Anecdote key={a.id} anecdote={a} handleVote={() => dispatch(voteAnecdote(a.id))}/>)
  )
}

export default Anecdotes