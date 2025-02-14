import React from "react";
import "./task-list.scss";
import { Link } from "react-router-dom";

export function TaskList() {
  return (
    <main className="task-list">
      <div className="left-container">
        <div className="day-selector">
          <input
            type="image"
            src="/mdi/chevron-left.svg"
            alt="Previous Day"
            width="24px"
            height="24px"
          />
          <h3>Today</h3>
          <input
            type="image"
            src="/mdi/chevron-right.svg"
            alt="Next Day"
            width="24px"
            height="24px"
          />
        </div>
        <ul className="list">
          <li>
            <input type="checkbox" />
            <span>Cleaning</span>
            <ul>
              <li>
                <input type="checkbox" />
                <span>Bathroom</span>
              </li>
              <li>
                <input type="checkbox" />
                <span>Front Patio</span>
              </li>
              <li>
                <input type="checkbox" />
                <span>Dishes</span>
              </li>
            </ul>
          </li>
          <li>
            <input type="checkbox" />
            <span>Homework</span>
            <ul>
              <li>
                <input type="checkbox" />
                <span>CS260</span>
                <ul>
                  <li>
                    <input type="checkbox" />
                    <span>Design Specs</span>
                  </li>
                  <li>
                    <input type="checkbox" />
                    <span>Key Features</span>
                  </li>
                </ul>
              </li>
              <li>
                <input type="checkbox" />
                <span>Calculus</span>
              </li>
              <li>
                <input type="checkbox" />
                <span>English Exam Studying</span>
              </li>
            </ul>
          </li>
        </ul>
        <br />
        <h4>Inactive Smart Tasks</h4>
        <ul>
          <li>
            <span>Clean the Pool</span>
          </li>
        </ul>

        <Link to="/add-task">
          <button className="add-task" type="button">
            Add Task
          </button>
        </Link>
      </div>

      <div className="right-container">
        <div className="collaborators-container">
          <h3>Collaborators</h3>
          <ul>
            <li>
              <span>John Doe</span>
              <span>(You)</span>
            </li>
            <li>
              <span>Jane Doe</span>
              <span>(Active)</span>
            </li>
            <li>
              <span>Joseph Doe</span>
            </li>
          </ul>
          <div>Add another user to your list:</div>
          <input
            className="share-input"
            type="email"
            placeholder="friend@email.com"
          />
          <button type="button">Share</button>
        </div>

        <div className="weather-container">
          <h3 className="weather-title">Weather</h3>
          <div className="weather-items">
            <div className="weather-item weather-today">
              <h4>Today</h4>
              <img
                src="/weather/wi-day-sunny.svg"
                alt="Sunny"
                width="64px"
                height="64px"
              />
              <span>85°F</span>
            </div>
            <div className="weather-item weather-tomorrow">
              <h4>Tomorrow</h4>
              <img
                src="/weather/wi-day-snow.svg"
                alt="Snowy"
                width="64px"
                height="64px"
              />
              <span>2°F</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
