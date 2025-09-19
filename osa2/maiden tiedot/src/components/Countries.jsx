const Country = ({ country, showCountry }) => {
  return (
  <li>
    {country.name.common}
    <button onClick={() => showCountry(country)}>Show</button>
  </li>
  )
}

const Countries = ( { countries, showCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length === 1) {
    return
  }

  return (
    <div>
        {countries.map(country => 
          <Country 
          key={country.name.common} 
          country={country} 
          showCountry={showCountry} 
          />
        )}
    </div>
  )

}

export default Countries