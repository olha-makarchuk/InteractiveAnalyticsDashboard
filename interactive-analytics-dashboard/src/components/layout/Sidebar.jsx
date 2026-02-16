import { useState } from "react";
import "./Sidebar.css";

function Sidebar({ activeSection, onSectionChange }) {
  const sections = [
    { id: "overview", label: "Огляд" },
    { id: "sales", label: "Продажі" },
    { id: "users", label: "Користувачі" },
    { id: "analytics", label: "Аналітика" },
  ];

  const [selectedRegions, setSelectedRegions] = useState([]);

  const regions = ["Київ", "Львів", "Одеса", "Харків"];

  const toggleRegion = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region],
    );
  };

  return (
    <aside className="sidebar">
      <nav>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`sidebar-btn ${
              activeSection === section.id ? "active" : ""
            }`}
          >
            {section.label}
          </button>
        ))}
      </nav>
      <div className="form-card activity-fieldset">
        <h3>Фільтри</h3>
        <div className="multiselect-container">
          <label className="section-title">Категорії</label>
          <label>
            <input type="checkbox" /> Електроніка
          </label>
          <label>
            <input type="checkbox" /> Одяг
          </label>
          <label>
            <input type="checkbox" /> Аксесуари
          </label>
        </div>
        <div className="form-group">
          <div className="section-title">Діапазон цін</div>
          <input
            type="range"
            min="0"
            max="10000"
          />
        </div>

        <div className="form-group">
          <div className="section-title">Регіони</div>
          <div className="multiselect-container">
            {regions.map((region) => (
              <label key={region} >
                <input
                  type="checkbox"
                  checked={selectedRegions.includes(region)}
                  onChange={() => toggleRegion(region)}
                />
                <span className="checkbox-label">{region}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
