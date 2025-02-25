import React from "react";
import "./login.scss";

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    // const response = await fetch(endpoint, {
    //   method: "post",
    //   body: JSON.stringify({ email: userName, password: password }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // });
    const response = { status: 200 }; // TODO: remove this line
    if (response?.status === 200) {
      localStorage.setItem("userName", userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }
  return (
    <div className="unauthenticated account-form">
      <div>
        <span>Email</span>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="your@email.com"
        />
      </div>
      <div>
        <span>Password</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
      </div>
      <div className="buttons">
        <button
          type="button"
          onClick={(e) => {
            loginUser();
          }}
        >
          Login
        </button>
        <button
          type="button"
          onClick={(e) => {
            createUser();
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
}
