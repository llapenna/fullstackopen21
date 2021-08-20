// Core
import React, { useEffect, useState } from 'react'

// Services
import personsService from './services/persons'

// Styles
import './index.css'

const Title = ({text}) => <h2>{text}</h2>

const Inputs = ({value, handleChange}) => {

  const handleChangeName = e => {
    handleChange(prev => ({...prev, name: e.target.value})) // Keeps the number value, but alters the name
  }
  const handleChangePhone = e => {
    handleChange(prev => ({...prev, number: e.target.value})) // Keeps the name value, but alters the number
  }

  return (
    <div>
      <div>name: <input onChange={handleChangeName} value={value.name} /></div>
      <div>phone: <input onChange={handleChangePhone} value={value.number} /></div>
    </div>
  )
}
const SubmitButton = () => (
  <div>
    <button type="submit">add</button>
  </div>
)
const Form = ({newPerson,handleSubmit, handleChange}) => (
  <>
    <Title text={'Add new Person'} />
    <form onSubmit={handleSubmit}>
      <Inputs handleChange={handleChange} value={newPerson} />
      <SubmitButton />
    </form>
  </>
)

const Person = ({person, refresh, handleError, handleNotification}) => {

  const handleDelete = () => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personsService.remove(person.id)
        .then(() => {
          handleNotification(`${person.name} deleted successfully.`)
          refresh()
        })
        .catch(e => {
          handleError(`${person.name} has already been deleted from server`)
          refresh()
        })
    }
  }

  // Table formatting for better looks
  return (
    <tr>
      <td style={{paddingRight: '15px'}}>{person.name}:</td>
      <td>{person.number}</td>
      <td><button onClick={handleDelete}>Delete</button></td>
    </tr>
  )
}
const Numbers = ({persons, filter, refresh, handleError, handleNotification}) => {

  const filteredPersons = filter === ''
    ? persons // No filter is applied
    // Filtering in lower case to create a case insensitive filter
    : persons.filter( ({name}) => name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      <Title text='Numbers' />
      <table>
        <tbody>
          { filteredPersons.map(p => 
            <Person 
              key={p.name} 
              person={p} 
              refresh={refresh}
              handleError={handleError}
              handleNotification={handleNotification}
            />)}
        </tbody>
      </table>
    </>
  )
}

const Search = ({value, handleChangeFilter}) => (
  <div>
    Search: <input value={value} onChange={handleChangeFilter}/>
  </div>
)

const Notification = ({notification}) => {

  return (
    notification.message !== ''
    ?
    <div className={notification.error ? 'error' : 'success'}>
      {notification.message}
    </div>
    : null
  )
}

const App = () => {

  const initialState = {
    name: '',
    number: '',
  }

  const [persons, setPersons] = useState([initialState]) 
  const [newPerson, setNewPerson] = useState(initialState)
  
  const [filter, setFilter] = useState('')

  const [notification, setNotification] = useState({message: '', error: true})


  const handleSubmit = e => {
    e.preventDefault()

    // findIndex returns -1 if no object was found
    if (persons.findIndex( ({name}) => name === newPerson.name) === -1) {
    
      personsService.create(newPerson)
        .then(newPerson => {
          setPersons([...persons, newPerson])
          handleNotification('Phonebook entry created successfully')
        })
        .catch(e => {
          handleError('Cannot create phonebook entry.')
        })

      setNewPerson({name:'', number:''}) // Clears the input
    }
    else
    {
      if (window.confirm(`${newPerson.name} is already in the phonebook, replace the old number?`)) {
        const id = persons.filter(p => p.name === newPerson.name)[0].id
        
        personsService
          .update(id, {number: newPerson.number})
          .then(() => {
            handleNotification(`${newPerson.name}'s number updated successfully.`)
            refreshPersons()
          })
          .catch(e => handleError(`Cannot update ${newPerson.name}'s number.`))
      }
    }
  }

  const handleChangeFilter = e => {
    setFilter(e.target.value)
  }

  const handleError = error => {
    setNotification({message: error, error: true})
    cleanNotification()
  }
  const handleNotification = notif => {
    setNotification({message: notif, error: false})
    cleanNotification()
  }
  const cleanNotification = () =>{
    setTimeout(() => setNotification({message: '', error: false}), 5000)
  }

  const refreshPersons = () => {
    personsService.getAll()
      .then(persons => setPersons(persons))
      .catch(e => {
        handleError('Error while requesting all entries.')
      })
  }

  useEffect(refreshPersons, [])

  return (
    <div>
      <Title text='Phonebook' />
      <Notification notification={notification} />
      <Search value={filter} handleChangeFilter={handleChangeFilter} />
      <Form 
        newPerson={newPerson}
        handleSubmit={handleSubmit}
        handleChange={setNewPerson}
      />
      <Numbers 
        filter={filter} 
        persons={persons} 
        refresh={refreshPersons} 
        handleError={handleError}
        handleNotification={handleNotification}
      />
    </div>
  )
}

export default App