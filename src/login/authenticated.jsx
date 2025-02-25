import React from "react";
import { useNavigate } from "react-router-dom";

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: "delete",
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        localStorage.removeItem("userName");
        props.onLogout();
      });
  }

  return (
    <div className="authenticated">
      <div className="username">{props.userName}</div>
      <div className="buttons">
        <button type="submit" onClick={() => navigate("/task-list")}>
          My Tasks
        </button>
        <button type="submit" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </div>
  );
}
