import { useId } from "react";
import "./Pagination.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const baseId = useId();

  return (
    <nav className="pagination-container" aria-labelledby={`${baseId}-nav`}>
      <span id={`${baseId}-nav`} className="sr-only" style={{display: 'none'}}>Навігація сторінками</span>
      
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-btn"
        aria-label="Попередня сторінка"
      >
        ← Назад
      </button>

      <div className="pagination-info">
        Сторінка <strong>{currentPage}</strong> з <strong>{totalPages}</strong>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-btn"
        aria-label="Наступна сторінка"
      >
        Вперед →
      </button>
    </nav>
  );
}

export default Pagination;