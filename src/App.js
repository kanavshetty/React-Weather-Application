import Search from './components/search/search';
import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import { Weather_API_URL } from './api';
import { Weather_API_KEY } from './api';
import { useState } from 'react';
import Forecast from './components/forecast/forecast';


function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentforecast, setCurrentForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [latitude, longitude] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${Weather_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${Weather_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${Weather_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${Weather_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setCurrentForecast({ city: searchData.label, ...forecastResponse });

      })

      .catch((err) => console.log(err));
  }


  console.log(currentforecast);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {currentforecast && <Forecast data={currentforecast} />}
    </div>
  );
}

export default App;
