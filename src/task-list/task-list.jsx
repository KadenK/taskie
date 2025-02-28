import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./task-list.scss";
import { Link } from "react-router-dom";
import { TaskItem } from "./task-item";
import { Weather } from "./weather";
import { selectRootTasks } from "../features/tasks/tasksSlice";

export function TaskList() {
  const tasks = useSelector(selectRootTasks);
  const dispatch = useDispatch();

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
        <Weather />
      </div>
    </main>
  );
}
