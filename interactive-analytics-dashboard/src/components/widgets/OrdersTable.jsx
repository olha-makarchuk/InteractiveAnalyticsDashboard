import { useMemo, useOptimistic, useState, useTransition } from "react";
import { mockOrders, mockStatuses } from "../../data/mockData";
import {
  updateOrderStatus,
  deleteOrder,
  toggleLikeOrder,
} from "../../utils/api";
import Pagination from "../common/Pagination";

const ITEMS_PER_PAGE = 10;

function OrdersTable() {
  const [orders, setOrders] = useState(mockOrders);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");

  const [isPending, startTransition] = useTransition();

  const [optimisticOrders, updateOptimisticOrders] = useOptimistic(
    orders,
    (currentOrders, action) => {
      switch (action.type) {
        case "UPDATE_STATUS":
          return currentOrders.map((order) =>
            order.id === action.id
              ? { ...order, status: action.payload, isUpdating: true }
              : order,
          );
        case "DELETE":
          return currentOrders.filter((order) => order.id !== action.id);
        case "TOGGLE_LIKE":
          return currentOrders.map((order) =>
            order.id === action.id
              ? {
                  ...order,
                  isLiked: !order.isLiked,
                  likes: order.isLiked ? order.likes - 1 : order.likes + 1,
                  isUpdating: true,
                }
              : order,
          );

        default:
          return currentOrders;
      }
    },
  );

  const handleLike = (orderId, isLiked) => {
    setError("");

    startTransition(async () => {
      updateOptimisticOrders({ type: "TOGGLE_LIKE", id: orderId });

      try {
        await toggleLikeOrder(orderId, isLiked);

        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  isLiked: !order.isLiked,
                  likes: order.isLiked ? order.likes - 1 : order.likes + 1,
                }
              : order,
          ),
        );
      } catch (err) {
        setError(err.message);
      }
    });
  };

  const handleStatusChange = (orderId, newStatus) => {
    setError("");
    startTransition(async () => {
      updateOptimisticOrders({
        type: "UPDATE_STATUS",
        id: orderId,
        payload: newStatus,
      });

      try {
        await updateOrderStatus(orderId, newStatus);
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order,
          ),
        );
      } catch (err) {
        setError(`Помилка оновлення #${orderId}: ${err.message}`);
      }
    });
  };

  const handleDelete = (orderId) => {
    if (!window.confirm("Ви впевнені, що хочете видалити це замовлення?"))
      return;

    setError("");
    startTransition(async () => {
      updateOptimisticOrders({ type: "DELETE", id: orderId });

      try {
        await deleteOrder(orderId);
        setOrders((prev) => prev.filter((order) => order.id !== orderId));
      } catch (err) {
        setError(`Не вдалося видалити #${orderId}: ${err.message}`);
      }
    });
  };

  const filteredOrders = useMemo(() => {
    return optimisticOrders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesStatus;
    });
  }, [optimisticOrders, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(
      firstPageIndex,
      firstPageIndex + ITEMS_PER_PAGE,
    );
  }, [currentPage, filteredOrders]);

  return (
    <div className="orders-page">
      <div
        className="filters-bar"
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1.5rem",
          alignItems: "flex-end",
        }}
      >
        <div className="filter-group">
          <label className="label-small">Статус:</label>
          <select
            className="select-styled"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">Всі статуси</option>
            {mockStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {isPending && <span className="loader-text">Синхронізація...</span>}
      </div>

      {error && (
        <div
          className="feedback-error"
          style={{ color: "red", marginBottom: "1rem" }}
        >
          {error}
        </div>
      )}

      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Клієнт</th>
              <th>Продукт</th>
              <th>Сума</th>
              <th>Статус</th>
              <th>Дата</th>
              <th>Дії</th>
              <th>❤️</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map((order) => (
              <tr
                key={order.id}
                style={{ opacity: order.isUpdating ? 0.6 : 1 }}
              >
                <td>{order.id}</td>
                <td style={{ fontWeight: 500 }}>{order.customer}</td>
                <td>{order.product}</td>
                <td className="amount-cell">
                  ${order.amount.toLocaleString()}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <select
                      className={`status-select status-${order.status}`}
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      disabled={isPending}
                    >
                      {mockStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <td style={{ color: "#666" }}>
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="btn-delete"
                    title="Видалити"
                  >
                    🗑️
                  </button>
                </td>
                <td>
                  <button
                    className={`like-btn ${order.isLiked ? "liked" : ""}`}
                    onClick={() => handleLike(order.id, order.isLiked)}
                    disabled={isPending}
                  >
                    {order.isLiked ? "❤️" : "🤍"} {order.likes}
                    {order.isUpdating && (
                      <span style={{ fontSize: "0.7rem", marginLeft: 4 }}>
                        збереження...
                      </span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredOrders.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#888" }}>
            За вашим запитом нічого не знайдено
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default OrdersTable;
