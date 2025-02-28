import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./task-list.scss";
import { Link } from "react-router-dom";
import { TaskItem } from "./task-item";
import { Collaborators } from "./collaborators";
import { Weather } from "./weather";
import { selectRootTasks } from "../features/tasks/tasksSlice";

export function TaskList() {
  const tasks = useSelector(selectRootTasks);
  const dispatch = useDispatch();

  return (
    <main className="task-list">
      <div className="left-container">
        <div className="list-header">
          <h3>Your List</h3>
        </div>
        <ul className="list">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
        {tasks.length === 0 && (
          <div className="empty-list">
            <p>Your task list is empty.</p>
            <p>Click the button below to add your first task!</p>
          </div>
        )}
        <br />

        <Link to="/add-task" className="add-task-link">
          <button className="add-task" type="button">
            Add Task
          </button>
        </Link>
      </div>

      <div className="right-container">
        <Collaborators />
        <Weather />
      </div>
    </main>
  );
}
