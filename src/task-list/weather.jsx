import React from "react";
import "./task-list.scss";
import { weatherConditions } from "../util/dummy";
import api from "../app/api";

export function Weather() {
  const handleWeatherClick = () => {
    api.getWeatherConditions();
  };

  return (
    <div className="weather-container">
      <h3 className="weather-title">Weather</h3>
      <div className="weather-items">
        <div className="weather-item weather-today">
          <h4>Today</h4>
          <img
            src={weatherConditions.today.condition.icon}
            alt={weatherConditions.today.condition.name}
            width="64px"
            height="64px"
            onClick={handleWeatherClick}
            style={{ cursor: "pointer" }}
          />
          <span>{weatherConditions.today.temperature}°F</span>
        </div>
        <div className="weather-item weather-tomorrow">
          <h4>Tomorrow</h4>
          <img
            src={weatherConditions.tomorrow.condition.icon}
            alt={weatherConditions.tomorrow.condition.name}
            width="64px"
            height="64px"
            onClick={handleWeatherClick}
            style={{ cursor: "pointer" }}
          />
          <span>{weatherConditions.tomorrow.temperature}°F</span>
        </div>
      </div>
    </div>
  );
}
