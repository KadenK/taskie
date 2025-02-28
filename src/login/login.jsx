import React from "react";
import { useSelector } from "react-redux";
import "./login.scss";
import { Unauthenticated } from "./unauthenticated";
import { Authenticated } from "./authenticated";
import { AuthState } from "./authState";

export function Login() {
  const authState = useSelector((state) => state.auth.authState);

  return (
    <main className="signin">
      {authState !== AuthState.Unknown && (
        <div>
          <h1>Take control of your day with</h1>
          <h1 className="light-green">Taskie</h1>
        </div>
      )}
      {authState === AuthState.Authenticated && <Authenticated />}
      {authState === AuthState.Unauthenticated && <Unauthenticated />}
    </main>
  );
}
