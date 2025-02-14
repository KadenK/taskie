import React from "react";
import "./app.scss";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import { Login } from "./login/login";
import { TaskList } from "./task-list/task-list";
import { AddTask } from "./add-task/add-task";

export default function App() {
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
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/task-list"
                  className={({ isActive }) => (isActive ? "selected" : "")}
                >
                  My Tasks
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-task"
                  className={({ isActive }) => (isActive ? "selected" : "")}
                >
                  Add a Task
                </NavLink>
              </li>
            </menu>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Login />} exact />
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
