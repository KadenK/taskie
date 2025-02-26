import React from "react";
import "./task-list.scss";
import { Link } from "react-router-dom";
import { TaskItem } from "./task-item";

export function TaskList() {
  const tasks = [
    {
      id: 1,
      name: "Task 1",
      checked: false,
      children: [
        { id: 5, name: "Subtask 1.1", checked: false },
        { id: 6, name: "Subtask 1.2", checked: true },
        { id: 7, name: "Subtask 1.3", checked: false },
        { id: 8, name: "Subtask 1.4", checked: true },
      ],
    },
    { id: 2, name: "Task 2", checked: true, children: [] },
    {
      id: 3,
      name: "Task 3",
      checked: false,
      children: [
        { id: 9, name: "Subtask 3.1", checked: false },
        {
          id: 10,
          name: "Subtask 3.2",
          checked: true,
          children: [
            { id: 11, name: "Subtask 3.2.1", checked: false },
            { id: 12, name: "Subtask 3.2.2", checked: true },
          ],
        },
        { id: 13, name: "Subtask 3.3", checked: false },
        { id: 14, name: "Subtask 3.4", checked: true },
      ],
    },
    { id: 4, name: "Task 4", checked: true },
  ];

  return (
    <main className="task-list">
      <div className="left-container">
        <div className="day-selector">
          <h3>Your List</h3>
        </div>
        <ul className="list">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
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
