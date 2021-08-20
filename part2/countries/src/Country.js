const Name = ({text}) => <h2>{text}</h2>

const BasicInfo = ({capital, population}) => (
  <>
    <p>Capital: {capital}</p>
    <p>population: {population}</p>
  </>
)

const Languages = ({list}) => (
  <div>
    <h3>Languages</h3>
    <ul>
      {list.map(l => <li key={l.iso639_1}>{l.name}</li>)}
    </ul>
  </div>
)

const Flag = ({image, name}) => <img src={image} alt={name} style={{width:'300px'}}/>

const Country = ({country}) => {
  return (
    <div>
      <Name text={country.name}/>
      <BasicInfo capital={country.capital} population={country.population} />
      <Languages list={country.languages} />
      <Flag image={country.flag} name={country.name}/>
    </div>
  )
}

export default Country