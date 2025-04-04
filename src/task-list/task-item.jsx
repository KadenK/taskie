import React, { useState, useEffect } from "react";
import "./task-list.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTaskChildren,
  setEditingTask,
  updateTask,
} from "../features/tasks/tasksSlice";
import { useNavigate } from "react-router-dom";
import { CollabEventType, CollaboratorsNotifier } from "./collaboratorsHandler";

export function TaskItem({ task }) {
  const children = useSelector((state) => selectTaskChildren(state, task));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(task.checked);

  // Update local state when Redux task changes
  useEffect(() => {
    setChecked(task.checked);
  }, [task.checked]);

  // Update Redux when local state changes
  useEffect(() => {
    if (checked !== task.checked) {
      const updatedTask = { ...task, checked };
      dispatch(updateTask(updatedTask));
      CollaboratorsNotifier.sendEvent(CollabEventType.Update);
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
