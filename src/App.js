import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행 되자마다 현재 위치 기반의 날씨 가 보인다.
// 2. 날씨 정보에는  도시,섭씨, 화씨, 날씨 상태 정보
//3, 5개의 버튼이 있다(1개는 현재 위치,4개는 다른 도시 )
//4. 클릭 할때마다 도시별 날씨가 나온다.
//5. 현재위치 버튼을 누르면 다시 현재 위치 날씨가 나온다.
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
function App() {

  const[weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const cities=['paris','new york', 'tokyo','seoul'];
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = ()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
    let lat = position.coords.latitude
    let lon = position.coords.longitude
    console.log("현재 위치",lat, lon);
    getWeatherByCurrentLocation(lat, lon);
    });
  }

  const getWeatherByCurrentLocation = async(lat, lon)=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f27dfa5e01d0573a5024223abb96dc3b&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log("data",data);
    setWeather(data);
    setLoading(false);
  }


  const getWeatherByCity = async()=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f27dfa5e01d0573a5024223abb96dc3b&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log("data",data);
    setWeather(data);
    setLoading(false);
  }

  useEffect(() =>{
    if(city === ''){
      getCurrentLocation();
    }else{
      getWeatherByCity();
    }
  },[city])

  
  return (
    <div>
      {loading?(
        <div className='container'>
          <ClipLoader color="#f88c6b" loading={loading} size={150}/>
        </div>
      ):(
        <div className='container'>
          <WeatherBox weather={weather}/>
          <WeatherButton cities={cities} setCity={setCity} getCurrentLocation={getCurrentLocation} city={city} />
        </div>
      )}

    </div>
  );
}

export default App;
