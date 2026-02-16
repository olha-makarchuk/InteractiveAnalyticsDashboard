import LiveSearch from "../../components/widgets/LiveSearch";
import StatsCard from "../../components/widgets/StatsCard";
import SalesChart from "../../components/widgets/SalesChart";
import OrdersTable from "../../components/widgets/OrdersTable";

function Overview() {
  return (
    <div className="overview">
      <div className="stats-grid">
        <StatsCard title="Дохід" value="₴1,245,890" change={15.3} icon="💵" />
        <StatsCard title="Замовлення" value="1,547" change={8.2} icon="🛒" />
        <StatsCard title="Користувачі" value="892" change={-2.4} icon="👤" />
        <StatsCard title="Товари" value="324" change={0} icon="📦" />
      </div>

      <SalesChart />
      <LiveSearch />
      <OrdersTable />
    </div>
  );
}

export default Overview;
