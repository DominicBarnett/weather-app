import { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';

const WeatherApp = () => {
  const [zipCode, setZipCode] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(API_URL, {
        params: {
          zip: `${zipCode},us`,
          appid: API_KEY,
          units: 'imperial'
        }
      });
      
      const newWeatherData = response.data;
      setWeatherData(newWeatherData);
      
      // Update search history
      setSearchHistory(currentHistory => {
        // Remove the city if it already exists in history
        const filteredHistory = currentHistory.filter(item => item.id !== newWeatherData.id);
        // Add the new search to the beginning
        const updatedHistory = [newWeatherData, ...filteredHistory];
        // Keep only the 5 most recent searches
        return updatedHistory.slice(0, 5);
      });
      
    } catch (err) {
      console.error('Detailed error:', err);
      if (err.response) {
        setError(`Error: ${err.response.data.message || 'Failed to fetch weather data'}`);
      } else if (err.request) {
        setError('No response received from the server. Please check your internet connection.');
      } else {
        setError('An error occurred while setting up the request.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString();
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Enter US ZIP code"
          pattern="[0-9]{5}"
          required
        />
        <button type="submit" disabled={loading}>
          Get Weather
        </button>
      </form>

      {loading && <div className="loading">Loading...</div>}
      
      {error && <div className="error">{error}</div>}
      
      {weatherData && !loading && !error && (
        <div className="current-weather">
          <h2>{weatherData.name}</h2>
          <div className="weather-details">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <div className="main-temp">
              {Math.round(weatherData.main.temp)}°F
              <div className="feels-like">
                Feels like: {Math.round(weatherData.main.feels_like)}°F
              </div>
            </div>
            <div className="weather-info">
              <div className="description">
                {weatherData.weather[0].description}
              </div>
              <div className="additional-info">
                <div>Humidity: {weatherData.main.humidity}%</div>
                <div>Wind: {Math.round(weatherData.wind.speed)} mph</div>
                <div>Pressure: {weatherData.main.pressure} hPa</div>
                <div>Visibility: {weatherData.visibility / 1609.34 | 0} miles</div>
                <div>Sunrise: {formatTime(weatherData.sys.sunrise)}</div>
                <div>Sunset: {formatTime(weatherData.sys.sunset)}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {searchHistory.length > 0 && (
        <div className="search-history">
          <h3>Recent Searches</h3>
          <div className="history-cards">
            {searchHistory.map((item) => (
              <div key={item.id} className="history-card">
                <h4>{item.name}</h4>
                <div className="card-weather">
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description}
                  />
                  <div className="card-temp">{Math.round(item.main.temp)}°F</div>
                </div>
                <div className="card-details">
                  <div>{item.weather[0].description}</div>
                  <div>Humidity: {item.main.humidity}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp; 