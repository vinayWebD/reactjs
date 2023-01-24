import React, { useState } from 'react';
import '../assets/css/weatherApp.css';

export default function weatherApp() {
  const [weatherData, setWeatherData] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function getData() {
    if (inputValue == '') {
      setErrorMessage('Sorry, City Name is required!');
      setWeatherData('');
    } else {
      let jsonData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValue},india&APPID=5b57435c854e3456c9623f874d8a07d5&units=metric`,
      ).then((response) => {
        return response.json();
      });
      if (jsonData.cod == '404') {
        setErrorMessage(jsonData.message);
        setWeatherData('');
      } else {
        setErrorMessage('');
        setWeatherData(jsonData);
      }
    }
    setInputValue('');
  }

  return (
    <div className="pageOuterWrapper">
      <div className="pageWrapper">
        <div className="pageContentWrap">
          <div className="searchBlock">
            <input
              type="search"
              name=""
              id="searchBar"
              value={inputValue}
              placeholder="Enter City Name"
              onChange={(e) => {
                setErrorMessage('');
                setInputValue(e.target.value);
              }}
            />
            <button id="searchBtn" onClick={() => getData()}>
              SEARCH
            </button>
          </div>
          <p className="errorPara">{errorMessage}</p>
          <div className="displayBlock">
            <h3>{weatherData == '' ? '' : weatherData.name}</h3>
            <img
              src={
                weatherData == ''
                  ? ''
                  : `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
              }
            />
            <h2>{weatherData == '' ? '' : `${weatherData.main.temp} °C`}</h2>
            <h3>{weatherData == '' ? '' : weatherData.weather[0].main}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
