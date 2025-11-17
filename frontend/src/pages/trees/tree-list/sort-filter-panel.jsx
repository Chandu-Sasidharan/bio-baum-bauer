import styles from './trees.module.css';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    sortTitle: 'Sortieren',
    sortPlaceholder: 'Sortieren nach',
    nameAsc: 'Name (A–Z)',
    nameDesc: 'Name (Z–A)',
    priceAsc: 'Preis aufsteigend',
    priceDesc: 'Preis absteigend',
    allTrees: 'Alle Bäume',
    filterTitle: 'Filtern',
    filterPlaceholder: 'Nach Kategorie filtern',
    categories: {
      'Fruit Tree': 'Obstbäume',
      'Nut Tree': 'Nussbäume',
      'Flowering Tree': 'Blühende Bäume',
      'Berry Shrubs': 'Beerensträucher',
      'Deciduous Forest': 'Laubwald',
      'Evergreen Forest': 'Immergrüner Wald',
    },
    allCategories: 'Alle Kategorien',
  },
  en: {
    sortTitle: 'Sort',
    sortPlaceholder: 'Sort By',
    nameAsc: 'Name Ascending',
    nameDesc: 'Name Descending',
    priceAsc: 'Price Ascending',
    priceDesc: 'Price Descending',
    allTrees: 'All trees',
    filterTitle: 'Filter',
    filterPlaceholder: 'Filter By Category',
    categories: {
      'Fruit Tree': 'Fruit Tree',
      'Nut Tree': 'Nut Tree',
      'Flowering Tree': 'Flowering Tree',
      'Berry Shrubs': 'Berry Shrubs',
      'Deciduous Forest': 'Deciduous Forest',
      'Evergreen Forest': 'Evergreen Forest',
    },
    allCategories: 'All Categories',
  },
};

export default function SortFilterPanel({ setSort, setCategory }) {
  const text = useCopy(copy);

  return (
    <aside className={styles.sortFilterContainer}>
      <div className={styles.asideElement}>
        <h2 className='mb-1 text-lg font-bold tracking-wide'>
          {text.sortTitle}
        </h2>
        <select
          onChange={e => setSort(e.target.value)}
          className='select border-primary input-light w-full pl-3 focus:outline-none'
          defaultValue=''
        >
          <option value='' disabled>
            {text.sortPlaceholder}
          </option>
          <option value='name:asc'>{text.nameAsc}</option>
          <option value='name:desc'>{text.nameDesc}</option>
          <option value='price:asc'>{text.priceAsc}</option>
          <option value='price:desc'>{text.priceDesc}</option>
          <option value=''>{text.allTrees}</option>
        </select>
      </div>
      <div className={styles.asideElement}>
        <h2 className='mb-1 text-lg font-bold tracking-wide'>
          {text.filterTitle}
        </h2>
        <select
          onChange={e => setCategory(e.target.value)}
          className='select border-primary input-light w-full pl-3 focus:outline-none'
          defaultValue=''
        >
          <option value='' disabled>
            {text.filterPlaceholder}
          </option>
          {Object.entries(text.categories).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
          <option value=''>{text.allCategories}</option>
        </select>
      </div>
    </aside>
  );
}
