import React, { useState } from "react";

const Signup = ({ onLogin }) => {
  const initalFormState = {
    username: "",
    password: "",
    password_confirmation: "",
  };

  const [formState, setFormState] = useState(initalFormState);
  const [errors, setErrors] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    }).then((r) => {
      if (r.ok) {
        r.json().then(onLogin);
      } else {
        r.json().then(console.log);
      }
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          type="text"
          value={formState.username}
          name="username"
          onChange={handleChange}
        ></input>
        <input
          placeholder="Password"
          type="text"
          value={formState.password}
          name="password"
          onChange={handleChange}
        ></input>
        <input
          placeholder="Confirm Password"
          type="text"
          value={formState.password_confirmation}
          name="password_confirmation"
          onChange={handleChange}
        ></input>
        <button type="submit">Submit</button>
        <div>
          {errors.length
            ? errors.map((e) => {
                return (
                  <p key={e} index={e.index}>
                    {e}
                  </p>
                );
              })
            : null}
        </div>
      </form>
    </>
  );
};

export default Signup;
