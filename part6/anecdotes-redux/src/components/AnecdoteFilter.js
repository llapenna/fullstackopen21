// core
import { connect } from 'react-redux'

// reducers
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = props => {

  const handleChange = e => {
    const filter = e.target.value
    props.setFilter(filter)
  }
  
  return (
    <div>
      filter <input onChange={handleChange} name='filter'/>
    </div>
  )
}

const mapDispatchToProps = {
  setFilter,
}

const ConnectedAnecdoteFilter = connect(null, mapDispatchToProps)(AnecdoteFilter)

export default ConnectedAnecdoteFilter