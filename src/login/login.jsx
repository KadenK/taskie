import React from "react";
import "./login.scss";

export function Login() {
  return (
    <main className="signin">
      <div>
        <h1>Take control of your day with</h1>
        <h1 className="light-green">Taskie</h1>
      </div>
      <form method="get" action="/task-list">
        <div>
          <span>Email</span>
          <input type="text" placeholder="your@email.com" />
        </div>
        <div>
          <span>Password</span>
          <input type="password" placeholder="password" />
        </div>
        <div className="buttons">
          <button type="submit">Login</button>
          <button type="submit">Create</button>
        </div>
      </form>
    </main>
  );
}
