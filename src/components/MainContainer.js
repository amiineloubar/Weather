import React, { useEffect, useState } from "react";
import CloudImage from "../images/cloud.png";
import humidityIcon from "../images/humidity.png";
import windIcon from "../images/wind.png";
import windDirectionIcon from "../images/wind-direction.png";
import visibilityIcon from "../images/visibility.png";

function MainContainer(props) {
  const value = props.location;
  const [icon, setIcon] = useState();
  const [temperature, setTemperature] = useState();
  const [wind, setWind] = useState();
  const [windDirection, setWindDirection] = useState();
  const [humidity, setHumidity] = useState();
  const [countryName, setCountryName] = useState();
  const [visibility, setVisibility] = useState();
  const [weather, setWeather] = useState();
  const [maxTemp, setMaxTemp] = useState();
  const [minTemp, setMinTemp] = useState();
  const [feels_like, setFeelsLike] = useState();

  const API_KEY = "Your openweathermap Api Key";

  useEffect(() => {
    if (value !== undefined) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          try {
            // console.log(data);
            let wind = data.wind.speed;
            let windDirection = data.wind.deg;
            let humidity = data.main.humidity;
            let countryName = data.name;
            let visibility = data.visibility;
            let temperature = data.main.temp - 272.15;
            let maxTemp = data.main.temp_max - 272.15;
            let minTemp = data.main.temp_min - 272.15;
            let feels_like = data.main.feels_like - 272.15;
            let icon = data.weather[0].icon;
            let weather = data.weather[0].description;
            setWind(wind);
            setWindDirection(Math.round(windDirection));
            setHumidity(Math.round(humidity));
            setCountryName(countryName);
            setWeather(weather);
            setVisibility(Math.round(visibility / 1000));
            setTemperature(Math.round(temperature));
            setMaxTemp(Math.round(maxTemp));
            setMinTemp(Math.round(minTemp));
            setFeelsLike(Math.round(feels_like));
            setIcon(icon);
          } catch {
            console.log("error");
          }
        });
    } else {
      return;
    }
  }, [value]);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date();
  let today = days[date.getDay()];
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let year = date.getFullYear();
  return (
    <>
      <div className="main-container">
        <div className="over-all">
          <div className="country">
            <img
              src={
                icon !== undefined
                  ? `http://openweathermap.org/img/wn/${icon}@2x.png`
                  : CloudImage
              }
              alt="cloud"
              className="image"
            />
            <h2 className="country-name">{countryName}</h2>
          </div>
          <h3 className="temperature">
            {temperature} <span>C°</span>
          </h3>
          <h4 className="date">{`${today} ${month}/${day}/${year}`}</h4>
          <div className="info">
            <p>{weather}</p>
            <span>|</span>
            <p>
              {maxTemp} C°| {minTemp} C°
            </p>
            <span>|</span>
            <p> Feels like {feels_like} C°</p>
          </div>
        </div>
        <div className="details">
          <div className="humidity">
            <div className="humidity-title">
              <img src={humidityIcon} alt="humidity" />
              <p>Humidity</p>
            </div>
            <div className="humidity-data">
              <p>
                {humidity} <span>%</span>
              </p>
            </div>
          </div>
          <div className="wind">
            <div className="wind-title">
              <img src={windIcon} alt="wind" />
              <p>Wind Speed</p>
            </div>
            <div className="wind-data">
              <p>
                {wind} <span>km/h</span>
              </p>
            </div>
          </div>
          <div className="wind-direction">
            <div className="wind-direction-title">
              <img src={windDirectionIcon} alt="wind-direction" />
              <p>Wind direction</p>
            </div>
            <div className="wind-direction-data">
              <p>
                {windDirection} <span>deg</span>
              </p>
            </div>
          </div>
          <div className="visibility">
            <div className="visibility-title">
              <img src={visibilityIcon} alt="visibility" />
              <p>Visibility</p>
            </div>
            <div className="visibility-data">
              <p>
                {visibility} <span>km</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainContainer;
