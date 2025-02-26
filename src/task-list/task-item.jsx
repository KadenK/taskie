import React, { useState } from "react";
import "./task-list.scss";
import { Link } from "react-router-dom";

export function TaskItem({ task, nestedCount = 0 }) {
  const [taskChecked, setTaskChecked] = useState(task.checked);
  const taskChildren = task.children || [];

  const toggleCheck = async () => {
    setTaskChecked(!taskChecked);
    try {
      // await fetch(`/api/tasks/${task.id}/toggle`, {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ checked: !taskChecked }),
      // });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <li>
      <input type="checkbox" checked={taskChecked} onChange={toggleCheck} />
      <span>{task.name}</span>
      {taskChildren.map((task) => (
        <TaskItem key={task.id} task={task} nestedCount={nestedCount + 1} />
      ))}
    </li>
  );
}
