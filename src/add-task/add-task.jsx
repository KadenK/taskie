import React from "react";
import "./add-task.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  updateTask,
  deleteTask,
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
    if (editingTask) {
      const updatedTask = {
        ...editingTask,
        name: formData.get("name"),
        parentId: formData.get("parent")
          ? parseInt(formData.get("parent"))
          : null,
      };
      if (formData.get("expires-checkbox") === "on") {
        updatedTask.expiration = formData.get("expiration");
      }
      dispatch(updateTask(updatedTask));
      navigate("/task-list");
      return;
    } else {
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
    }
  };

  const deleteTask = () => {
    if (editingTask) {
      dispatch(deleteTask(editingTask));
      navigate("/task-list");
    }
  };

  const [isExpiresChecked, setIsExpiresChecked] = React.useState(false);

  const handleExpiresChange = (event) => {
    setIsExpiresChecked(event.target.checked);
  };

  return (
    <main className="add-task">
      <h1>{!!editingTask ? "Edit Task" : "Add a New Task"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            defaultValue={editingTask?.name}
            required
          />
        </div>
        <div>
          <label>Parent</label>
          <select
            id="parent"
            name="parent"
            defaultValue={editingTask?.parentId}
          >
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
            defaultChecked={!!editingTask?.expiration}
            onChange={handleExpiresChange}
          />
          {(isExpiresChecked || editingTask?.expiration) && (
            <input
              type="date"
              name="expiration"
              id="expiration-date"
              defaultValue={editingTask?.expiration}
              required
            />
          )}
        </div>
        <div className="button-container">
          <button type="submit">
            {!!editingTask ? "Save Task" : "Create Task"}
          </button>
          {!!editingTask && (
            <button type="button" onClick={deleteTask}>
              Delete Task
            </button>
          )}
        </div>
      </form>
    </main>
  );
}
