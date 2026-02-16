import {
  useContext,
  useMemo,
  useState,
  useEffect,
  useDeferredValue,
} from "react";
import { mockUsers } from "../../data/mockData";
import { LoadingContext } from "../../contexts/LoadingContext";

function UsersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activityFilter, setActivityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const deferredSearch = useDeferredValue(searchTerm);

  const isPending = searchTerm !== deferredSearch;
  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (isPending) {
      startLoading();
    } else {
      const timer = setTimeout(stopLoading, 300);
      return () => clearTimeout(timer);
    }
  }, [isPending, startLoading, stopLoading]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = useMemo(() => {
    return mockUsers
      .filter((user) => {
        const matchesSearch = user.name
          .toLowerCase()
          .includes(deferredSearch.toLowerCase());

        const matchesStatus =
          activityFilter === "all" ||
          (activityFilter === "active" ? user.isActive : !user.isActive);

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);

        return new Date(b[sortBy]) - new Date(a[sortBy]);
      });
  }, [deferredSearch, activityFilter, sortBy]);

  return (
    <div className="users-container">
      <div className="users-header">
        <fieldset className="activity-fieldset">
          <legend className="section-title">Статус активності</legend>
          <div className="radio-group">
            {["all", "active", "inactive"].map((id) => (
              <div key={id} className="radio-item">
                <input
                  type="radio"
                  id={id}
                  name="activity"
                  value={id}
                  checked={activityFilter === id}
                  onChange={(e) => setActivityFilter(e.target.value)}
                />
                <label htmlFor={id}>
                  {id === "all"
                    ? "Усі"
                    : id === "active"
                      ? "Активні"
                      : "Неактивні"}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="search-sort-row">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Пошук за іменем..."
          className="search-input"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="select-styled"
        >
          <option value="name">Ім'я (А-Я)</option>
          <option value="registeredAt">Дата реєстрації</option>
          <option value="lastActivity">Остання активність</option>
        </select>
      </div>

      <div
        className="table-container"
        style={{
          opacity: isPending ? 0.6 : 1,
          transition: "opacity 0.2s ease",
          pointerEvents: isPending ? "none" : "all",
        }}
      >
        <table className="orders-table">
          <thead>
            <tr>
              <th>Користувач</th>
              <th>Роль</th>
              <th>Статус</th>
              <th>Реєстрація</th>
              <th>Активність</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{user.name}</div>
                  <div
                    style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}
                  >
                    {user.email}
                  </div>
                </td>
                <td>
                  <span className={`badge ${user.role}`}>{user.role}</span>
                </td>
                <td>
                  <span
                    className={`status-dot ${user.isActive ? "active" : "inactive"}`}
                  />
                  {user.isActive ? "Активний" : "Офлайн"}
                </td>
                <td>{new Date(user.registeredAt).toLocaleDateString()}</td>
                <td>{new Date(user.lastActivity).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;
