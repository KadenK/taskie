import React from "react";
import "./app.scss";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { AuthState } from "./login/authState";
import { TaskList } from "./task-list/task-list";
import { AddTask } from "./add-task/add-task";

export default function App() {
  const [userName, setUserName] = React.useState(
    localStorage.getItem("userName") || ""
  );
  const currentAuthState = userName
    ? AuthState.Authenticated
    : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
    <BrowserRouter>
      <div className="body bg-dark text-light">
        <header>
          <a className="logo-section" href="index.html">
            <img
              src="taskie-logo.svg"
              alt="Taskie Logo"
              width="24px"
              height="24px"
            />
            <h1>Taskie</h1>
          </a>

          <nav>
            <menu>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "selected" : "")}
                >
                  {authState === AuthState.Authenticated ? "Home" : "Login"}
                </NavLink>
              </li>
              {authState === AuthState.Authenticated && (
                <li>
                  <NavLink
                    to="/task-list"
                    className={({ isActive }) => (isActive ? "selected" : "")}
                  >
                    My Tasks
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li>
                  <NavLink
                    to="/add-task"
                    className={({ isActive }) => (isActive ? "selected" : "")}
                  >
                    Add a Task
                  </NavLink>
                </li>
              )}
            </menu>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}
              />
            }
            exact
          />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer>
          <hr />
          <span className="text-reset">Kaden Keep</span>
          <a href="https://github.com/KadenK/taskie">GitHub Repository</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
