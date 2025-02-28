import React from "react";
import "./add-task.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  selectEditingTask,
  selectAllTasks,
} from "../features/tasks/tasksSlice";
import { useNavigate } from "react-router-dom";

export function AddTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector(selectAllTasks);
  const editingTask = useSelector(selectEditingTask);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const task = {
      name: formData.get("name"),
      checked: false,
      parentId: formData.get("parent")
        ? parseInt(formData.get("parent"))
        : null,
    };
    if (formData.get("expires-checkbox") === "on") {
      task.expiration = formData.get("expiration");
    }
    dispatch(addTask(task));
    navigate("/task-list");
  };

  const [isExpiresChecked, setIsExpiresChecked] = React.useState(false);

  const handleExpiresChange = (event) => {
    setIsExpiresChecked(event.target.checked);
  };

  return (
    <main className="add-task">
      <h1>Add a New Task</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name</label>
          <input type="text" name="name" placeholder="Name" required />
        </div>
        <div>
          <label>Parent</label>
          <select id="parent" name="parent">
            <option value="">None</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Expires</label>
          <input
            type="checkbox"
            className="expires-checkbox"
            name="checked"
            id="expires-checkbox"
            onChange={handleExpiresChange}
          />
          {isExpiresChecked && (
            <input
              type="date"
              name="expiration"
              id="expiration-date"
              required
            />
          )}
        </div>
        <button type="submit">Create Task</button>
      </form>
    </main>
  );
}
