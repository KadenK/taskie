import React from "react";
import "./login.scss";
import { Unauthenticated } from "./unauthenticated";
import { Authenticated } from "./authenticated";
import { AuthState } from "./authState";

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className="signin">
      {authState !== AuthState.Unknown && (
        <div>
          <h1>Take control of your day with</h1>
          <h1 className="light-green">Taskie</h1>
        </div>
      )}
      {authState === AuthState.Authenticated && (
        <Authenticated
          userName={userName}
          onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)}
        />
      )}
      {authState === AuthState.Unauthenticated && (
        <Unauthenticated
          userName={userName}
          onLogin={(loginUserName) => {
            onAuthChange(loginUserName, AuthState.Authenticated);
          }}
        />
      )}
    </main>
  );
}
