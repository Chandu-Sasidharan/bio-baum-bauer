import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Spinner from '@/components/elements/spinner';
import Breadcrumbs from '@/components/elements/breadcrumbs';
import backgroundImage from '/images/background/leaves-background.webp';
import useTrees from '@/hooks/use-trees';
import PaginationControls from './pagination-controls';
import styles from './trees.module.css';
import Card from './card';
import treeIcon from '/images/misc/tree.png';

export default function Trees() {
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const limit = 9;

  const { trees, isLoading, error, total } = useTrees({
    sort,
    category,
    page,
    limit,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error fetching data!</div>;
  }

  return (
    <>
      <Helmet>
        <title>Trees | Bio Baum Bauer</title>
      </Helmet>

      {/* Outer Container */}
      <section
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className='bg-cover bg-center bg-no-repeat'
      >
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          {/* Breadcrumbs */}
          <div className='w-full px-5'>
            <Breadcrumbs />
          </div>

          {/* Inner Container to center the content */}
          <div className='mx-auto max-w-7xl'>
            <div className={styles.mainContainer}>
              {/* Sidebar */}
              <aside className={styles.asideContainer}>
                <h2 className='mb-4 text-lg font-bold'>Sort & Preferences</h2>
                <select
                  onChange={e => setSort(e.target.value)}
                  className='mb-2 block w-full rounded bg-blue-500 p-2 text-white'
                >
                  <option value=''>Sort By</option>
                  <option value='name:asc'>Name Ascending</option>
                  <option value='name:desc'>Name Descending</option>
                  <option value='price:asc'>Price Ascending</option>
                  <option value='price:desc'>Price Descending</option>
                </select>
                <select
                  onChange={e => setCategory(e.target.value)}
                  className='mb-2 block w-full rounded bg-blue-500 p-2 text-white'
                >
                  <option value=''>Filter By Category</option>
                  <option value='Fruit Tree'>Fruit Tree</option>
                  <option value='Nut Tree'>Nut Trees</option>
                  <option value='Flowering Tree'>Flowering Trees</option>
                  <option value='Berry Shrubs'>Berry Shrubs</option>
                  <option value='Deciduous Forest'>Deciduous Forest</option>
                  <option value='Evergreen Forest'>Evergreen Forest</option>
                </select>
              </aside>

              {/* Main Content */}
              <main className='flex-1'>
                <PaginationControls
                  page={page}
                  setPage={setPage}
                  total={total}
                  limit={limit}
                />

                {/* Responsive grid for the cards */}
                <div className={styles.gridContainer}>
                  {trees.map(tree => (
                    <Link to={`/trees/${tree._id}`} key={tree._id}>
                      <Card
                        imageUrl={tree.imageUrl}
                        name={tree.name}
                        price={tree.price.$numberDecimal}
                      >
                        Plant Now
                      </Card>
                    </Link>
                  ))}
                </div>

                <PaginationControls
                  page={page}
                  setPage={setPage}
                  total={total}
                  limit={limit}
                />
              </main>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
