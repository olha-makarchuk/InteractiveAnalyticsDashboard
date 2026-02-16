import { useState, useMemo } from "react";
import { mockProducts } from "../../data/mockData";

function TopProducts() {
  const [sortBy, setSortBy] = useState("salesCount");

  const sortedProducts = useMemo(() => {
    return [...mockProducts]
      .sort((a, b) => b[sortBy] - a[sortBy])
      .slice(0, 10);
  }, [sortBy]);

  const maxVal = sortedProducts.length > 0 ? sortedProducts[0][sortBy] : 0;

  return (
    <div className="top-products-card">
      <div className="top-products-title">
        <span>Рейтинг товарів</span>
        <div className="sort-controls">
          <button 
            className={`sort-btn ${sortBy === "salesCount" ? "active" : ""}`}
            onClick={() => setSortBy("salesCount")}
          >
            За продажами
          </button>
          <button 
            className={`sort-btn ${sortBy === "revenue" ? "active" : ""}`}
            onClick={() => setSortBy("revenue")}
          >
            За доходом
          </button>
        </div>
      </div>

      <div className="products-list">
        {sortedProducts.map((product) => {
          const progressWidth = maxVal > 0 ? (product[sortBy] / maxVal) * 100 : 0;
          
          return (
            <div key={product.id} className="product-item">
              <div className="product-info">
                <span className="product-name">{product.name}</span>
                <span className="product-value">
                  {sortBy === "revenue" 
                    ? `${product.revenue.toLocaleString()} ₴` 
                    : `${product.salesCount} од.`}
                </span>
              </div>
              <div className="progress-bg">
                <div 
                  className={`progress-bar ${sortBy === "revenue" ? "revenue-mode" : ""}`} 
                  style={{ width: `${progressWidth}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TopProducts;