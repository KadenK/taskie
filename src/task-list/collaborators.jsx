import React from "react";
import "./task-list.scss";
import { useSelector } from "react-redux";
import { collaborators } from "../util/dummy";

export function Collaborators() {
  const username = useSelector((state) => state.auth.username);
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
            {collaborator.active ? <span>(Active)</span> : null}
          </li>
        ))}
      </ul>
      <div>Join another user's list:</div>
      <input
        className="share-input"
        type="email"
        placeholder="friend@email.com"
      />
      <button type="button">Join</button>
    </div>
  );
}
