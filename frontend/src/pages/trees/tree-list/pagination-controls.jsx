import styles from './trees.module.css';

export default function PaginationControls({ page, setPage, total, limit }) {
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className={styles.paginationContainer}>
      <span className='text-sm'>
        Showing {startItem} to {endItem} of {total} items
      </span>
      <div className='join'>
        <button
          className='join-item btn btn-sm'
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          «
        </button>
        <span className={`join-item btn btn-sm ${styles.noHover}`}>
          Page {page}
        </span>
        <button
          className='join-item btn btn-sm'
          onClick={() => setPage(prev => (endItem < total ? prev + 1 : prev))}
          disabled={endItem >= total}
        >
          »
        </button>
      </div>
    </div>
  );
}
