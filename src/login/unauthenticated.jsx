import React from "react";
import { useDispatch } from "react-redux";
import { login, createUser } from "../features/auth/authSlice";
import "./login.scss";

export function Unauthenticated() {
  const dispatch = useDispatch();
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    dispatch(login({ username, password }));
  };

  const handleCreateUser = () => {
    dispatch(createUser({ username, password }));
  };

  return (
    <div className="unauthenticated account-form">
      <div>
        <span>Username</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="username"
        />
      </div>
      <div>
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
      </div>
      <div className="buttons">
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={handleCreateUser}>
          Create
        </button>
      </div>
    </div>
  );
}
