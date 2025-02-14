import React from "react";
import "./add-task.scss";

export function AddTask() {
  return (
    <main className="add-task">
      <h1>Add a New Task</h1>
      <form method="get" action="list.html">
        <div>
          <label>Task Name</label>
          <input type="text" placeholder="Name" />
        </div>
        <div>
          <label>Parent</label>
          <select id="parents" name="parents">
            <option value="none">None</option>
            <option value="cleaning">Cleaning</option>
            <option value="homework">Homework</option>
            <option value="shopping">Shopping</option>
          </select>
        </div>
        <div className="multi-level">
          <div>
            <label>Date</label>
            <div className="multi-day-container">
              <label>Multi-day:</label>
              <input type="checkbox" />
            </div>
          </div>
          <div>
            <input type="date" />
            <span>-</span>
            <input type="date" />
          </div>
        </div>
        <div className="multi-level">
          <div>
            <label>Smart Condition: </label>
            <input type="checkbox" />
          </div>
          <div className="smart-condition-container">
            <span>If</span>
            <select id="smart-day" name="smart-day">
              <option value="today">today</option>
              <option value="tomorrow">tomorrow</option>
            </select>
            <span>is</span>
            <select id="smart-weather" name="smart-weather">
              <option value="sunny">sunny</option>
              <option value="rainy">rainy</option>
              <option value="snowy">snowy</option>
              <option value="freezing">freezing</option>
              <option value="windy">windy</option>
            </select>
          </div>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </main>
  );
}
