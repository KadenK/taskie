import React, { useState } from "react";
import "./task-list.scss";
import { useSelector, useDispatch } from "react-redux";
import { collaborators as defaultCollaborators } from "../util/dummy";
import { joinList } from "../features/tasks/tasksSlice";

export function Collaborators() {
  const [listName, setListName] = useState("");
  const username = useSelector((state) => state.auth.username);
  const subscribedList = useSelector((state) => state.auth.subscribedList);
  const dispatch = useDispatch();

  const [collaborators, setCollaborators] = useState(defaultCollaborators);

  // Simulate the collaboration websocket
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCollaborators((prevCollaborators) =>
        prevCollaborators.map((collaborator) => ({
          ...collaborator,
          isActive: Math.random() < 0.5,
        }))
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const handleJoin = () => {
    if (listName) {
      dispatch(joinList(listName));
      setListName("");
    }
  };

  return (
    <div className="collaborators-container">
      <h3>Collaborators</h3>
      <div>Current list: {subscribedList || "None"}</div>
      <ul>
        <li>
          <span>{username}</span>
          <span>(You)</span>
        </li>
        {collaborators.map((collaborator, index) => (
          <li key={index}>
            <span>{collaborator.name}</span>
            {collaborator.name === username ? <span>(You)</span> : null}
            {collaborator.isActive ? <span>(Active)</span> : null}
          </li>
        ))}
      </ul>
      <div>Join a list:</div>
      <input
        className="share-input"
        type="text"
        placeholder="Enter list name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <button type="button" onClick={handleJoin}>
        Join
      </button>
    </div>
  );
}
