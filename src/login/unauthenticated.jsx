import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, createUser } from "../features/auth/authSlice";
import "./login.scss";

export function Unauthenticated() {
  const dispatch = useDispatch();
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Username and password are required");
      return;
    }
    try {
      const resultAction = await dispatch(login({ username, password }));
      if (login.rejected.match(resultAction)) {
        setErrorMessage(
          resultAction.payload.includes("Unauthorized")
            ? "Invalid username or password"
            : "Login failed"
        );
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleCreateUser = async () => {
    if (!username || !password) {
      setErrorMessage("Username and password are required");
      return;
    }
    try {
      const resultAction = await dispatch(createUser({ username, password }));
      if (createUser.rejected.match(resultAction)) {
        setErrorMessage(
          resultAction.payload.includes("Conflict")
            ? "User already exists"
            : "Failed to create user"
        );
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    setErrorMessage("");
  }, [username, password]);

  return (
    <div className="unauthenticated account-form">
      <div className={`error-message ${errorMessage ? "" : "hidden"}`}>
        {errorMessage}
      </div>
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
