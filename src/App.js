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
  //API KEY
  const API_KEY = process.env.REACT_APP_API_KEY;
  console.log("API_KEY",API_KEY);

  const[weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const cities=['paris','new york', 'tokyo','seoul'];
  const [loading, setLoading] = useState(false);
  //darkMode
  const [darkMode, setDarkMode] = useState(false);

  const getCurrentLocation = ()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
    let lat = position.coords.latitude
    let lon = position.coords.longitude
    console.log("현재 위치",lat, lon);
    getWeatherByCurrentLocation(lat, lon);
    });
  }

  const getWeatherByCurrentLocation = async(lat, lon)=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    console.log("data",data);
    setWeather(data);
    setLoading(false);
  }


  const getWeatherByCity = async()=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
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


  // darkMode
  useEffect(() => {
    if (darkMode) {
      document.querySelector(".toggle").classList.add("dark");
      document.querySelector(".toggle>div").classList.add("dark");
      document.body.classList.add('dark');
      console.log("darkMode",darkMode);
    } else {
      document.querySelector(".toggle").classList.remove("dark");
      document.querySelector(".toggle>div").classList.remove("dark");
      document.body.classList.remove('dark');
      console.log("darkMode",darkMode);
    }
  }, [darkMode]);
  
  return (
    <div>
          <div className="app-button">
            {/* <h1>{darkMode ? '🌙 다크 모드' : '☀️ 라이트 모드'}</h1>
              <button onClick={() => setDarkMode(prev => !prev)}>
              {darkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
            </button> */}
            <div className='toggle'>
              <div onClick={() => setDarkMode(prev => !prev)}></div>
            </div>
            {/* <h6>{darkMode ? '다크 모드' : '라이트 모드'}</h6> */}
          </div>
      {loading?(
        <div className='container'>
          <ClipLoader color="#f88c6b" loading={loading} size={150}/>
        </div>
      ):(
        <div className='container'>
          <WeatherBox weather={weather}/>
          <WeatherButton cities={cities} setCity={setCity} getCurrentLocation={getCurrentLocation} city={city} weather={weather} />
        </div>
      )}

    </div>
  );
}

export default App;
