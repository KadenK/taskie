import React from "react";
import "./app.scss";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Login } from "./login/login";
import { AuthState } from "./login/authState";
import { TaskList } from "./task-list/task-list";
import { AddTask } from "./add-task/add-task";
import {
  clearEditingTask,
  selectEditingTask,
  fetchTasks,
} from "./features/tasks/tasksSlice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function App() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.authState);
  const editingTask = useSelector(selectEditingTask);
  const location = useLocation();
  const navigate = useNavigate();
  const [previousLocation, setPreviousLocation] = useState(null);
  const [editingActive, setEditingActive] = useState(false);

  useEffect(() => {
    if (authState === AuthState.Authenticated) {
      dispatch(fetchTasks());
    }
  }, [authState, dispatch]);

  useEffect(() => {
    setEditingActive(!!editingTask);
  }, [editingTask]);

  useEffect(() => {
    if (previousLocation === "/add-task" && location.pathname !== "/add-task") {
      dispatch(clearEditingTask());
    }
    setPreviousLocation(location.pathname);
  }, [location]);

  useEffect(() => {
    const authRequiredPaths = ["/task-list", "/add-task"];

    if (
      authState === AuthState.Unauthenticated &&
      authRequiredPaths.includes(location.pathname)
    ) {
      navigate("/");
    }
  }, [authState, location.pathname, navigate]);

  return (
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
              <>
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
                    {!!editingTask ? "Edit Task" : "Add a Task"}
                  </NavLink>
                </li>
              </>
            )}
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
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
