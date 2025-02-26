import React, { useState } from "react";
import "./task-list.scss";

export function SmartTask({ task, inactive = false }) {
  const [taskChecked, setTaskChecked] = useState(task.checked);

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
      {!inactive && (
        <input type="checkbox" checked={taskChecked} onChange={toggleCheck} />
      )}
      <span>{task.name}</span>
    </li>
  );
}
