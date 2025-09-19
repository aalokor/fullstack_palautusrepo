import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const getWeather = (country) => {
  const api_key = import.meta.env.VITE_SOME_KEY
  const request = axios.get(`${baseUrl}${country.name.common},${country.cca2}&appid=${api_key}&units=metric`)
  return request.then(response => response.data)
}

export default { getWeather }