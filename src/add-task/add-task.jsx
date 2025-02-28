import React from "react";
import "./add-task.scss";

export function AddTask() {
  return (
    <main className="add-task">
      <h1>Add a New Task</h1>
      <form method="get" action="task-list">
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
        <button type="submit">Create Task</button>
      </form>
    </main>
  );
}
