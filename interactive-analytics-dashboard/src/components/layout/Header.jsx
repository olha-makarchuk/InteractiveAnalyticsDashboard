import ThemeToggle from "../ui/ThemeToggle";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useContext, useState } from "react";
import { LoadingContext } from "../../contexts/LoadingContext";
import "./Header.css";

function Header() {
  const { isLoading, startLoading, stopLoading } = useContext(LoadingContext);
  const [period, setPeriod] = useState("today");

  const handleRefresh = () => {
    startLoading();

    setTimeout(() => {
      stopLoading();
    }, 1500);
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>Analytics Dashboard</h1>
      </div>

      <div className="header-center">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="select-styled"
        >
          <option value="today">Сьогодні</option>
          <option value="week">Тиждень</option>
          <option value="month">Місяць</option>
          <option value="year">Рік</option>
        </select>

        <button className="submit-btn" onClick={handleRefresh}>
          Оновити
        </button>

        {isLoading && <LoadingSpinner />}
      </div>

      <div className="header-right">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
