import React, { useState } from "react";
import Header from "./Header";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user);
          setUsername("");
          setPassword("");
        });
      } else {
        console.log("else");
        r.json().then((err) => setErrors(err.errors));
      }
    });
  };

  return (
    <>
      <h1>Taskier</h1>
      <div class="login-form-container">
        <form onSubmit={handleSubmit}>
          <input
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username..."
          />
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password..."
          />
          <button
            className="btn"
            style={{ backgroundColor: "green" }}
            type="submit"
          >
            Login
          </button>
          {errors.length ? errors.map((err, i) => <p key={i}>{err}</p>) : null}
        </form>
      </div>
    </>
  );
};

export default Login;
