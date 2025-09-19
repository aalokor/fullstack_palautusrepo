const Languages = ({ languages }) => {
  return (
    <ul>
      {Object.values(languages).map((language) => (
        <li key={language}>{language}</li>
      ))}
    </ul>
  )
}

const FullCountry = ({ country }) => {
    if (!country) 
        return
  
    return (
      <div>
          <h1>{country.name.common}</h1>
          <p>
            Capital {country.capital} <br />
            Area {country.area}
          </p>
          <h2>Languages</h2>
          <Languages languages={country.languages} />
          <img src={country.flags.png} />
          <h2>Weather in {country.name.common}</h2>
      </div>
    )
}

export default FullCountry