import React, { useEffect, useState } from "react";
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
import {
  CollaboratorsNotifier,
  CollabEventType,
} from "../task-list/collaboratorsHandler";

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
        parentId: formData.get("parent") ? formData.get("parent") : null,
      };
      if (expiresChecked) {
        updatedTask.expiration = formData.get("expiration");
      }
      dispatch(updateTask(updatedTask));
      CollaboratorsNotifier.sendEvent(CollabEventType.Update);
      navigate("/task-list");
      return;
    } else {
      const task = {
        name: formData.get("name"),
        checked: false,
        parentId: formData.get("parent") ? formData.get("parent") : null,
      };
      if (expiresChecked) {
        task.expiration = formData.get("expiration");
      }
      dispatch(addTask(task));
      CollaboratorsNotifier.sendEvent(CollabEventType.Add);
      navigate("/task-list");
    }
  };

  const handleDeleteTask = () => {
    if (editingTask) {
      dispatch(deleteTask(editingTask));
      CollaboratorsNotifier.sendEvent(CollabEventType.Delete);
      navigate("/task-list");
    }
  };

  const [expiresChecked, setExpiresChecked] = useState(false);

  useEffect(() => {
    if (editingTask?.expiration) {
      setExpiresChecked(true);
    }
  }, [editingTask]);

  const handleExpiresChange = (event) => {
    setExpiresChecked(event.target.checked);
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
          {expiresChecked && (
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
            <button type="button" onClick={handleDeleteTask}>
              Delete Task
            </button>
          )}
        </div>
      </form>
    </main>
  );
}
