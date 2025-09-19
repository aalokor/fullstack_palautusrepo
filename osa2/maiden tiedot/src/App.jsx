import { useState, useEffect } from 'react'
import FindForm from './components/FindForm'
import Countries from './components/Countries'
import FullCountry from './components/FullCountry'
import Weather from './components/Weather'
import countryService from './services/countries'
import weatherService from './services/weather'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')
  const [weather, setWeather] = useState('')

  useEffect(() => {
    countryService.getAll().then((allCountries) => {
      setCountries(allCountries)
    })
  }, [])

  const trimmedFilter = filter.toLowerCase().trim()

  const match = countries.find(
    country => country.name.common.toLowerCase().trim() === trimmedFilter
  )
  
  const countriesToShow = trimmedFilter === '' ? [] 
  : match ? [match]
    : countries.filter(country =>
        country.name.common.toLowerCase().trim().includes(trimmedFilter)
      )
    
  useEffect(() => {
  if (countriesToShow.length === 1 && !country) {
    setCountry(countriesToShow[0])
    }
  }, [countriesToShow, country])

  useEffect(() => {
    if (country) {
      weatherService.getWeather(country).then((countryWeather) => {
        setWeather(countryWeather);
    })
    } else {
      setWeather('')
    }
  }, [country])
    
  const handleFindFormChange = (event) => {
    setFilter(event.target.value)
    setCountry('')
  }

  const showCountry = (country) => {
    setCountry(country)
  }

  return (
    <div>
      <FindForm 
        filter={filter}
        handleFindFormChange={handleFindFormChange}
      />
      <Countries countries={countriesToShow} showCountry={showCountry} />
      <FullCountry country={country} />
      <Weather weather={weather} />
    </div>
  )
}

export default App

