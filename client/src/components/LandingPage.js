import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const LandingPage = ({ onLogin }) => {
  const [login, setLogin] = useState(true);

  return (
    <>
      <div>
        {login ? <Login onLogin={onLogin} /> : <Signup onLogin={onLogin} />}
      </div>
      <button onClick={() => setLogin((prev) => !prev)}>
        {login ? "Signup" : "Login"}
      </button>
    </>
  );
};

export default LandingPage;
