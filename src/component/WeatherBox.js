import React from 'react'

const WeatherBox = ({weather}) => {
    // console.log("weather ",weather)

   

  return (
    <div className="weather-box">
        {weather?(<h2>Today's weather</h2>):(<h2>Oops!😢</h2>)}
        <br/>
        <h4>{weather?.name}</h4>
        {weather?(<h3>{weather?.main.temp}°C /{(weather?.main.temp * 9/5 + 32).toFixed(1)}°F</h3>):(<div className='warn'> We couldn't get your location.<br/> Please check your browser settings and allow access.</div>)}
        <div>{weather?.weather[0].description}</div>
    </div>
  )
}

export default WeatherBox