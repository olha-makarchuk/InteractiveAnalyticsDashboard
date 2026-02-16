import { useEffect, useState, useTransition } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { loadChartData } from "../../utils/api";

function SalesChart() {
  const [periodType, setPeriodType] = useState("daily");
  const [filteredData, setFilteredData] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handlePeriodChange = (e) => {
    const newPeriod = e.target.value;
    setPeriodType(newPeriod);

    startTransition(() => {
      loadChartData(newPeriod).then((data) => {
        setFilteredData(data);
      });
    });
  };

  useEffect(() => {
    loadChartData(periodType).then((data) => {
      setFilteredData(data);
    });
  }, [periodType]);

  const getConfig = () => {
    if (periodType === "daily") {
      return { dataKeyX: "day", dataKeyY: "sales" };
    }
    if (periodType === "monthly") {
      return { dataKeyX: "name", dataKeyY: "revenue" };
    }
    return { dataKeyX: "year", dataKeyY: "total" };
  };

  const { dataKeyX, dataKeyY } = getConfig();

  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">Статистика продажів</h3>

        <div className="chart-controls">
          {isPending && (
            <span className="chart-loader">Оновлення даних...</span>
          )}
          <label className="text-muted" style={{ fontSize: "0.875rem" }}>
            Період:
          </label>
          <select
            className="select-styled"
            value={periodType}
            onChange={handlePeriodChange}
          >
            <option value="daily">Тиждень</option>
            <option value="monthly">Місяць</option>
            <option value="yearly">Рік</option>
          </select>
        </div>
      </div>

      <div className="chart-container" style={{ opacity: isPending ? 0.4 : 1 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey={dataKeyX}
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
                color: "var(--text-primary)",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKeyY}
              name="Дохід"
              stroke="var(--primary)"
              strokeWidth={3}
              dot={{ r: 4, fill: "var(--primary)" }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesChart;
