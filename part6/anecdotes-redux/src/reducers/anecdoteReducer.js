//services
import anecdotesService from '../services/anecdotes'

const initial = []


const reducer = (state = initial, action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const oldAnecdote = state.find(a => a.id === id)
      const updatedAnecdote = {
        ...oldAnecdote,
        votes: oldAnecdote.votes + 1
      }

      return state.map(a => a.id === id ? updatedAnecdote : a)

    case "NEW_ANECDOTE":
      const anecdote = action.data
      return [...state, anecdote]

    case "INIT_ANECDOTES":
      return action.data
      
    default:
      return state
  }
}

// export const voteAnecdote = id => {
//   return async dispatch => {

//   }
// }
export const voteAnecdote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdotesService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: anecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer