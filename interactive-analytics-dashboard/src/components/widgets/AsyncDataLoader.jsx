import { use, Suspense, useState } from "react";
import { fetchAnalyticsData } from "../../utils/api";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorBoundary from "../common/ErrorBoundary";

function DataDisplay({ dataPromise }) {
  const data = use(dataPromise);

  return (
    <div>
      <h4>{data.title}</h4>
      <div>
        {data.items.map((item) => (
          <div key={item.year} className="stats-card">
            <div className="stats-value">{item.total.toLocaleString()} ₴</div>

            <div
              className={`stats-change ${item.growth >= 0 ? "positive" : "negative"}`}
            >
              {item.growth}
            </div>

            <div className="section-title">{item.year}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AsyncDataWidget() {
  const [dataPromise, setDataPromise] = useState(() => fetchAnalyticsData());

  const handleRefresh = () => {
    setDataPromise(fetchAnalyticsData());
  };

  return (
    <div>
      <div>
        <h3>Аналітичний звіт:</h3>
        <button className="submit-btn" onClick={handleRefresh}>
          Оновити
        </button>
      </div>

      <ErrorBoundary onReset={handleRefresh}>
        <Suspense
          fallback={
            <div>
              <LoadingSpinner />
              <p>Завантаження річних даних...</p>
            </div>
          }
        >
          <DataDisplay dataPromise={dataPromise} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
