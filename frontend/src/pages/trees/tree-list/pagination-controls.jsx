import styles from './trees.module.css';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    showing: 'Zeige',
    of: 'von',
    items: 'Einträgen',
    page: 'Seite',
  },
  en: {
    showing: 'Showing',
    of: 'of',
    items: 'items',
    page: 'Page',
  },
};

export default function PaginationControls({ page, setPage, total, limit }) {
  const text = useCopy(copy);
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className={styles.paginationContainer}>
      <span className='text-sm'>
        {text.showing} {startItem}-{endItem} {text.of} {total} {text.items}
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
          {text.page} {page}
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
