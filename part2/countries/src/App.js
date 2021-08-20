import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Country from './Country'


const Title = ({text}) => <h1>{text}</h1>

const Input = ({setFilter, filter}) => {

  const handleChangeFilter = e => {
    setFilter(e.target.value)
  }

  return (
    <>
      find countries 
      <input 
        placeholder='country'
        onChange={handleChangeFilter}
        value={filter}
      />
    </>
  )
}

const Result = ({country}) => {

  const [visible, setVisible] = useState(false)

  return (
    <div>
      {country.name}
      <button onClick={() => setVisible(!visible)}>show</button>
      {visible && <Country country={country} />}
    </div>
  )
}

const ResultList = ({results}) => {
  if (results.length === 0) {
    return <p>No countries match this filter.</p>
  }
  if (results.length === 1) {
    return <Country country={results[0]} />
  }
  else if (results.length > 1 && results.length <= 10) {
    return results.map( c => <Result key={c.alpha3Code} country={c}/> ) 
  }
  else {
    return <p>Too many matches, specify another filter.</p>
  }
}

const App = () => {

  const [results, setResults] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
    .get(`https://restcountries.eu/rest/v2/all`)
    .then(response => {
      setResults(response.data)
    })
  }, [])

  const filteredResults = 
    results.filter( 
      c => c.name.toLowerCase().includes(filter.toLowerCase()) && filter !== ''
    )

  return (
    <>
      <Title text='Data for Countries' />
      <Input setFilter={setFilter} filter={filter} />
      <ResultList results={filteredResults} />
    </>
  )
}

export default App