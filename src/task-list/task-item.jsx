import React, { useState } from "react";
import "./task-list.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectTaskChildren, updateTask } from "../features/tasks/tasksSlice";

export function TaskItem({ task }) {
  const children = useSelector((state) => selectTaskChildren(state, task));
  const dispatch = useDispatch();

  const toggleCheck = async () => {
    const updatedTask = { ...task, checked: !task.checked };
    dispatch(updateTask(updatedTask));
  };

  return (
    <li>
      <input type="checkbox" checked={task.checked} onChange={toggleCheck} />
      <span>{task.name}</span>
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
