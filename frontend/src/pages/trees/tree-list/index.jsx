import { useState, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Helmet } from 'react-helmet-async';
import Spinner from '@/components/elements/spinner';
import Breadcrumbs from '@/components/elements/breadcrumbs';
import backgroundImage from '/images/background/leaves-background.webp';
import useTrees from '@/hooks/use-trees';
import Sidebar from './sidebar';
import CardGrid from './card-grid';
import PaginationControls from './pagination-controls';
import styles from './trees.module.css';

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

  // Reset page when category changes
  useEffect(() => {
    setPage(1);
  }, [category]);

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
              <Sidebar setSort={setSort} setCategory={setCategory} />

              {/* Main Content */}
              <main className='flex-1'>
                <PaginationControls
                  page={page}
                  setPage={setPage}
                  total={total}
                  limit={limit}
                />
                <Fade
                  key={`${sort}-${category}-${page}`}
                  delay={100}
                  cascade
                  damping={0.1}
                  duration={3000}
                >
                  <CardGrid trees={trees} />
                </Fade>
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
