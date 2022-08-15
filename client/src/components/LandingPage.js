import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const LandingPage = ({ onLogin }) => {
  const [login, setLogin] = useState(true);

  return (
    <>
      <div className="form-container">
        {login ? <Login onLogin={onLogin} /> : <Signup onLogin={onLogin} />}

        <p>{login ? "New user?" : "Already a user?"}</p>
        <h3 className="login-btns" onClick={() => setLogin((prev) => !prev)}>
          {login ? "Signup for free" : "Go to Login"}
        </h3>
      </div>
    </>
  );
};

export default LandingPage;
