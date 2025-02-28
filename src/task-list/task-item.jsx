import React, { useState } from "react";
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

  const toggleCheck = async () => {
    const updatedTask = { ...task, checked: !task.checked };
    dispatch(updateTask(updatedTask));
  };

  const handleTaskEdit = () => {
    dispatch(setEditingTask(task));
    navigate("/add-task");
  };

  return (
    <li>
      <input type="checkbox" checked={task.checked} onChange={toggleCheck} />
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
