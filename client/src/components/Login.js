import React, { useState } from "react";

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
        <input type="submit" />
        {errors.length ? errors.map((err, i) => <p key={i}>{err}</p>) : null}
      </form>
    </>
  );
};

export default Login;
