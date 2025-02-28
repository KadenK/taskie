import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export function Authenticated() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);

  function handleLogout() {
    dispatch(logout()).finally(() => {
      localStorage.removeItem("username");
    });
  }

  return (
    <div className="authenticated">
      <div className="username">{username}</div>
      <div className="buttons">
        <button type="submit" onClick={() => navigate("/task-list")}>
          My Tasks
        </button>
        <button type="submit" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    </div>
  );
}
