import React, { useMemo } from "react";
import "./task-list.scss";
import { Link } from "react-router-dom";
import { TaskItem } from "./task-item";
import { SmartTask } from "./smart-task";

export function TaskList({ tasks, smartTasks, weatherConditions }) {
  const getActiveSmartTasks = () => {
    return smartTasks.filter(
      (task) => task.condition === weatherConditions[task.when]
    );
  };

  const tasksWithSmartTasks = useMemo(() => {
    const activeSmartTasks = getActiveSmartTasks();
    return [
      {
        id: "smart-tasks",
        name: "Smart Tasks",
        checked: false,
        children: activeSmartTasks,
      },
      ...tasks,
    ];
  }, [tasks, smartTasks, weatherConditions]);

  const getInactiveSmartTasks = () => {
    return smartTasks.filter(
      (task) => task.condition !== weatherConditions[task.when]
    );
  };

  const inactiveSmartTasks = useMemo(() => {
    return getInactiveSmartTasks();
  }, [smartTasks, weatherConditions]);

  return (
    <main className="task-list">
      <div className="left-container">
        <div className="day-selector">
          <h3>Your List</h3>
        </div>
        <ul className="list">
          {tasksWithSmartTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
        <br />
        <h4>Inactive Smart Tasks</h4>
        <ul>
          {inactiveSmartTasks.map((task) => (
            <SmartTask
              key={task.id}
              task={task}
              weatherConditions={weatherConditions}
              inactive={true}
            />
          ))}
          {inactiveSmartTasks.length === 0 && <li>No inactive smart tasks</li>}
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
