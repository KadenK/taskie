import React, { useState } from "react";
import "./task-list.scss";
import { useSelector, useDispatch } from "react-redux";
import { joinList, fetchTasks } from "../features/tasks/tasksSlice";
import { CollabEventType, CollaboratorsNotifier } from "./collaboratorsHandler";

export function Collaborators() {
  const [listNameInput, setListNameInput] = useState("");
  const username = useSelector((state) => state.auth.username);
  const subscribedList = useSelector((state) => state.auth.subscribedList);
  const dispatch = useDispatch();

  const [collaborators, setCollaborators] = useState([]);

  React.useEffect(() => {
    CollaboratorsNotifier.addHandler(updateCollaborator);
    return () => {
      CollaboratorsNotifier.removeHandler(updateCollaborator);
    };
  });

  const updateCollaborator = (event) => {
    // Extract name and status from the event object
    const name = event.from;
    const status = event.type;
    const listName = event.listName;

    // Only care abou the current list
    if (listName !== subscribedList) {
      return;
    }

    // If the event is a system ListStatus event, update the list of collaborators
    if (status === CollabEventType.ListStatus) {
      const newCollaborators = event.collaborators
        .filter((collaborator) => collaborator !== username)
        .map((collaborator) => ({
          name: collaborator,
          status: "",
        }));
      setCollaborators(newCollaborators);
      return;
    }

    if (
      [
        CollabEventType.Add,
        CollabEventType.Update,
        CollabEventType.Delete,
      ].includes(status)
    ) {
      setTimeout(() => dispatch(fetchTasks()), 100);
    }

    // Find the collaborator in the list
    const index = collaborators.findIndex((collaborator) => {
      return collaborator.name === name;
    });

    // Create a timeout to clear the user's status after 5 seconds
    const timeout = setTimeout(() => {
      setCollaborators((currentCollaborators) => {
        const index = currentCollaborators.findIndex((collaborator) => {
          return collaborator.name === name;
        });
        if (index !== -1) {
          let newCollaborators = [...currentCollaborators];
          if (newCollaborators[index].status !== CollabEventType.Leave) {
            newCollaborators[index].status = "";
            newCollaborators[index].timeout = null;
          } else {
            // If the user has left, remove them from the list
            newCollaborators.splice(index, 1);
          }

          return newCollaborators;
        }
        return currentCollaborators;
      });
    }, 3000);

    // If not in the list yet, add it
    if (index === -1) {
      const newCollaborator = {
        name: name,
        status: status,
        timeout,
      };
      const newCollaborators = [...collaborators, newCollaborator];
      setCollaborators(newCollaborators);
    } else {
      // If already in the list, clear any timeout and update it
      if (collaborators[index].timeout) {
        clearTimeout(collaborators[index].timeout);
      }
      const updatedCollaborator = {
        name: name,
        status: status,
        timeout,
      };
      const newCollaborators = [...collaborators];
      newCollaborators[index] = updatedCollaborator;
      setCollaborators(newCollaborators);
    }
  };

  const handleJoin = () => {
    if (listNameInput) {
      CollaboratorsNotifier.sendEvent(CollabEventType.Leave, subscribedList);
      dispatch(joinList(listNameInput));
      CollaboratorsNotifier.sendEvent(CollabEventType.Join, listNameInput);
      setListNameInput("");
      setCollaborators([]);
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
            {collaborator.status ? <span>({collaborator.status})</span> : null}
          </li>
        ))}
      </ul>
      <div>Join/Create a list:</div>
      <input
        className="share-input"
        type="text"
        placeholder="e.g. John's List"
        value={listNameInput}
        onChange={(e) => setListNameInput(e.target.value)}
      />
      <button type="button" onClick={handleJoin}>
        Join
      </button>
    </div>
  );
}
