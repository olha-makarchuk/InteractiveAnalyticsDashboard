import { useState } from "react";
import { mockUsers, mockProducts } from "../../data/mockData";
import useDeferredSearch from "../../hooks/useDeferredSearch";

function LiveSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    filteredData: filteredUsers,
    isPending,
    highlightMatch,
  } = useDeferredSearch(mockUsers, searchTerm, "name");

  const {
    filteredData: filteredProducts,
  } = useDeferredSearch(mockProducts, searchTerm, "name");

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="Пошук користувачів та товарів..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isPending && <div className="pending-indicator">Оновлення...</div>}

      <div className="search-section">
        {searchTerm && <div className="section-title">Користувачі</div>}

        {!isPending && searchTerm && filteredUsers.length === 0 && (
          <div className="no-results">Нікого не знайдено</div>
        )}

        {!isPending && filteredUsers.length > 0 && (
          <ul className="results-list">
            {filteredUsers.map((user) => (
              <li key={user.id} className="result-item">
                {highlightMatch(user.name)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="search-section">
        {searchTerm && <div className="section-title">Товари</div>}

        {!isPending && searchTerm && filteredProducts.length === 0 && (
          <div className="no-results">Товарів не знайдено</div>
        )}

        {!isPending && filteredProducts.length > 0 && (
          <ul className="results-list">
            {filteredProducts.map((product) => (
              <li key={product.id} className="result-item">
                {highlightMatch(product.name)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default LiveSearch;
