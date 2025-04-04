import React from 'react'

const WeatherBox = ({weather}) => {
    console.log("weather",weather)
  return (
    <div className="weather-box">
        <h2>Today's weather</h2>
        <br/>
        <h4>{weather?.name}</h4>
        <h3>{weather?.main.temp}°C /{(weather?.main.temp * 9/5 + 32).toFixed(1)}°F</h3>
        <div>{weather?.weather[0].description}</div>
    </div>
  )
}

export default WeatherBox