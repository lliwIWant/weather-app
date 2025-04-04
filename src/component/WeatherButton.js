import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity, getCurrentLocation, city}) => {
    console.log("cities",cities)
  return (
    <div className='button-box'>
          <Button className='button crayon-button' variant={`${city == ''? "danger":"warning"}`} onClick={()=>{getCurrentLocation(); setCity('')}}>CurrentLocation</Button>
          {cities.map((item, index)=>(
              <Button className='button crayon-button'  variant={`${city == item? "danger":"warning"}`}key={index} onClick={()=>{setCity(item)}}>{item}</Button>
          ))} 
    </div>
  )
}

export default WeatherButton