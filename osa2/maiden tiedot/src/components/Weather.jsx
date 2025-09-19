const Weather = ({ weather }) => {
    if (!weather) 
        return
    
    const weathericonURL = 'https://openweathermap.org/img/wn/'
  
    return (
    <div>
      <p>Temperature {weather.main.temp} Celsius</p>
      <img src={`${weathericonURL}${weather.weather[0].icon}@2x.png`} />
      <p>Wind {weather.wind.speed} m/s</p>   
    </div>
  )
}

export default Weather