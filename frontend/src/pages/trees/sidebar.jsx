import styles from './trees.module.css';

export default function Sidebar({ setSort, setCategory }) {
  return (
    <aside className={styles.asideContainer}>
      <div className={styles.asideElement}>
        <h2 className='mb-1 text-lg font-bold tracking-wide'>Sort</h2>
        <select
          onChange={e => setSort(e.target.value)}
          className='select border-primary w-full rounded pl-3 focus:outline-none'
        >
          <option value='' disabled selected>
            Sort By
          </option>
          <option value='name:asc'>Name Ascending</option>
          <option value='name:desc'>Name Descending</option>
          <option value='price:asc'>Price Ascending</option>
          <option value='price:desc'>Price Descending</option>
          <option value=''>All trees</option>
        </select>
      </div>
      <div className={styles.asideElement}>
        <h2 className='mb-1 text-lg font-bold tracking-wide'>Filter</h2>
        <select
          onChange={e => setCategory(e.target.value)}
          className='select border-primary w-full rounded pl-3 focus:outline-none'
        >
          <option value='' disabled selected>
            Filter By Category
          </option>
          <option value='Fruit Tree'>Fruit Tree</option>
          <option value='Nut Tree'>Nut Tree</option>
          <option value='Flowering Tree'>Flowering Tree</option>
          <option value='Berry Shrubs'>Berry Shrubs</option>
          <option value='Deciduous Forest'>Deciduous Forest</option>
          <option value='Evergreen Forest'>Evergreen Forest</option>
          <option value=''>All Categories</option>
        </select>
      </div>
    </aside>
  );
}
