import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./ThemeToggle.css";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button className={`theme-toggle ${theme}`} onClick={toggleTheme}></button>
  );
}

export default ThemeToggle;
