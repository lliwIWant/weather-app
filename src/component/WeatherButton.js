import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities, setCity, getCurrentLocation, city, flag, darkMode}) => {
    console.log("cities",cities)

  return (
    <div className='button-box'>

          {flag ?(<Button className='button crayon-button' 
          variant={`${darkMode?(city == ''?"outline-danger":"outline-warning"):(city == ''? "danger":"warning")}`} 
          onClick={()=>{getCurrentLocation(); setCity('')}}>Current Location</Button>
        ):(
          <Button className='button crayon-button' 
          variant={`${darkMode?(city == ''?"outline-danger":"outline-warning"):(city == ''? "danger":"warning")}`} 
          onClick={()=>{getCurrentLocation(); setCity('')}}>Oops!😢</Button>
        ) }        
          {cities.map((item, index)=>(
              <Button className='button crayon-button'  
                    variant={`${darkMode?(city == item?"outline-danger":"outline-warning"):(city == item? "danger":"warning")}`}key={index} 
                    onClick={()=>{
                      setCity(item);
                    }}>
                      {item}
              </Button>
          ))} 
    </div>
  )
}

export default WeatherButton