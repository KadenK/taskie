import React, { useState, useEffect } from "react";
import "./task-list.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTaskChildren,
  setEditingTask,
  updateTask,
} from "../features/tasks/tasksSlice";
import { useNavigate } from "react-router-dom";

export function TaskItem({ task }) {
  const children = useSelector((state) => selectTaskChildren(state, task));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(task.checked);

  useEffect(() => {
    if (checked !== task.checked) {
      const updatedTask = { ...task, checked };
      dispatch(updateTask(updatedTask));
    }
  }, [checked]);

  const handleTaskEdit = () => {
    dispatch(setEditingTask(task));
    navigate("/add-task");
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <span onClick={handleTaskEdit}>{task.name}</span>
      {children.length > 0 && (
        <ul>
          {children.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </li>
  );
}
