import React from "react";
import "./task-list.scss";
import { weatherConditions } from "../util/dummy";

export function Weather() {
  return (
    <div className="weather-container">
      <h3 className="weather-title">Weather</h3>
      <div className="weather-items">
        <div className="weather-item weather-today">
          <h4>Today</h4>
          <img
            src={weatherConditions.today.icon}
            alt={weatherConditions.today.name}
            width="64px"
            height="64px"
          />
          <span>85°F</span>
        </div>
        <div className="weather-item weather-tomorrow">
          <h4>Tomorrow</h4>
          <img
            src={weatherConditions.tomorrow.icon}
            alt={weatherConditions.tomorrow.name}
            width="64px"
            height="64px"
          />
          <span>2°F</span>
        </div>
      </div>
    </div>
  );
}
