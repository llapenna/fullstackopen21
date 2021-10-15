// core
import { useDispatch } from 'react-redux'

// reducers
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const handleChange = e => {
    const filter = e.target.value
    dispatch(setFilter(filter))
  }
  
  return (
    <div>
      filter <input onChange={handleChange} name='filter'/>
    </div>
  )
}

export default AnecdoteFilter