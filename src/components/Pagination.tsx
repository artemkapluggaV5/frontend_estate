import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem', flexWrap: 'wrap' }}>
      <button
        className="btn btn-secondary"
        style={{ padding: '0.5rem 1rem' }}
        disabled={currentPage === 1}
        onClick={() => {
          onPageChange(currentPage - 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <i className="pi pi-angle-left"></i>
      </button>

      {pages.map(page => (
        <button
          key={page}
          className={`btn ${currentPage === page ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '0.5rem 1rem', minWidth: '40px' }}
          onClick={() => {
            onPageChange(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          {page}
        </button>
      ))}

      <button
        className="btn btn-secondary"
        style={{ padding: '0.5rem 1rem' }}
        disabled={currentPage === totalPages}
        onClick={() => {
          onPageChange(currentPage + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <i className="pi pi-angle-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
