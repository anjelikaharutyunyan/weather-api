import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import { useEffect, useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (cityName) => {
    if (!cityName) return;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      // ✅ handle API errors safely
      if (data.cod !== 200) {
        console.error(data.message);
        return;
      }

      const iconCode = data.weather[0].icon;
      const icon = allIcons[iconCode] || clear_icon;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search(city)}
        />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(city)}
          style={{ cursor: "pointer" }}
        />
      </div>

      <img
        src={weatherData?.icon || clear_icon}
        alt=""
        className="weather-icon"
      />

      <p className="temperature">
        {weatherData ? `${weatherData.temperature}°C` : "--"}
      </p>

      <p className="location">{weatherData ? weatherData.location : "--"}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <p>{weatherData ? `${weatherData.humidity}%` : "--"}</p>
          <span>Humidity</span>
        </div>

        <div className="col">
          <img src={wind_icon} alt="" />
          <p>{weatherData ? `${weatherData.windSpeed} m/s` : "--"}</p>
          <span>Wind speed</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
