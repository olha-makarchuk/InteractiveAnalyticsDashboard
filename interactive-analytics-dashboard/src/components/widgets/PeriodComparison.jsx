import { useState, useTransition, useMemo } from "react";
import { mockSalesData } from "../../data/mockData";

function PeriodComparison() {
  const periods = mockSalesData.yearly;

  const [periodA, setPeriodA] = useState(periods[0].year);
  const [periodB, setPeriodB] = useState(periods[1].year);

  const [selectedA, setSelectedA] = useState(periods[0]);
  const [selectedB, setSelectedB] = useState(periods[1]);

  const [isPending, startTransition] = useTransition();

  const handleChangeA = (value) => {
    setPeriodA(value);

    startTransition(() => {
      const data = periods.find((p) => p.year === value);
      setSelectedA(data);
    });
  };

  const handleChangeB = (value) => {
    setPeriodB(value);

    startTransition(() => {
      const data = periods.find((p) => p.year === value);
      setSelectedB(data);
    });
  };

  const percentageChange = useMemo(() => {
    if (!selectedA || !selectedB) return 0;
    return (
      ((selectedB.total - selectedA.total) / selectedA.total) *
      100
    ).toFixed(1);
  }, [selectedA, selectedB]);

  return (
    <div className="form-card">
      <h3>📊 Порівняння періодів</h3>

      <div className="selectors">
        <select
          value={periodA}
          onChange={(e) => handleChangeA(e.target.value)}
        >
          {periods.map((p) => (
            <option key={p.year} value={p.year}>
              {p.year}
            </option>
          ))}
        </select>

        <span>vs</span>

        <select
          value={periodB}
          onChange={(e) => handleChangeB(e.target.value)}
        >
          {periods.map((p) => (
            <option key={p.year} value={p.year}>
              {p.year}
            </option>
          ))}
        </select>
      </div>

      {isPending && <p style={{ opacity: 0.6 }}>Оновлення...</p>}

      <div className="comparison-grid">
        <div className="form-card">
          <h4>{selectedA.year}</h4>
          <p>{selectedA.total.toLocaleString()} грн</p>
        </div>

        <div className="form-card">
          <h4>{selectedB.year}</h4>
          <p>{selectedB.total.toLocaleString()} грн</p>
        </div>
      </div>

      <div
        className={`change ${
          percentageChange > 0 ? "positive" : "negative"
        }`}
      >
        Зміна: {percentageChange}%
      </div>
    </div>
  );
}

export default PeriodComparison;
