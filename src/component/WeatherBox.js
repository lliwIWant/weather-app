import React from 'react'

const WeatherBox = ({weather}) => {
    console.log("weather 널이야?",weather)

   

  return (
    <div className="weather-box">
        <h2>Today's weather</h2>
        <br/>
        <h4>{weather?.name}</h4>
        {weather?(<h3>{weather?.main.temp}°C /{(weather?.main.temp * 9/5 + 32).toFixed(1)}°F</h3>):(<h6>위치를 알 수 없어요😢</h6>)}
        <div>{weather?.weather[0].description}</div>
    </div>
  )
}

export default WeatherBox