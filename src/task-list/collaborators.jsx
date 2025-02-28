import React, { useState } from "react";
import "./task-list.scss";
import { useSelector, useDispatch } from "react-redux";
import { collaborators as defaultCollaborators } from "../util/dummy";
import { joinList } from "../features/tasks/tasksSlice";

export function Collaborators() {
  const [email, setEmail] = useState("");
  const username = useSelector((state) => state.auth.username);
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
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleJoin = () => {
    dispatch(joinList(email));
    setEmail("");
  };

  return (
    <div className="collaborators-container">
      <h3>Collaborators</h3>
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
      <div>Join another user's list:</div>
      <input
        className="share-input"
        type="email"
        placeholder="friend@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="button" onClick={handleJoin}>
        Join
      </button>
    </div>
  );
}
