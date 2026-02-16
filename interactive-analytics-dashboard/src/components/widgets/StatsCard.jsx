import React, { useId } from "react";
import "../../styles/widgets.css";

function StatsCard({ title, value, change, icon }) {
  const titleId = useId();
  const valueId = useId();
  return (
    <div className="stats-card" role="region" aria-labelledby={titleId}>
      <h3 id={titleId}>
        {title} {icon}
      </h3>
      <div className="stats-value" id={valueId}>
        {value}
      </div>
      <div className="stats-change">
        {change === 0 && <div style={{ color: "grey" }}>{change}%→</div>}
        {change < 0 && <div style={{ color: "red" }}>{change}%↓</div>}
        {change > 0 && <div style={{ color: "green" }}>{change}%↑</div>}
      </div>
    </div>
  );
}

export default StatsCard;
