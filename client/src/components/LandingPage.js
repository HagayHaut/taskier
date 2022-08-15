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
        <button onClick={() => setLogin((prev) => !prev)}>
          {login ? "Signup" : "Login"}
        </button>
      </div>
    </>
  );
};

export default LandingPage;
