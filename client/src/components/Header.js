import { useLocation } from "react-router-dom";
import Button from "./Button";
import React from "react";

function Header({ onAdd, showAdd, isDarkMode, onToggleDarkMode }) {
  const location = useLocation();
  return (
    <div>
      <header className="header">
        <button
          className={isDarkMode ? "mode-btn dark" : "mode-btn"}
          onClick={onToggleDarkMode}
        >
          {isDarkMode ? "Light" : "Dark"}
        </button>
        <h1>Taskier</h1>
        {location.pathname === "/" && (
          <Button
            color={showAdd ? "red" : "green"}
            text={showAdd ? "Close" : "Add"}
            onClick={onAdd}
          />
        )}
      </header>
    </div>
  );
}

Header.defaultProps = {
  title: "Task Tracker",
};

export default Header;
