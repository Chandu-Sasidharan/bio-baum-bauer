import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Spinner from '@/components/elements/spinner';
import Breadcrumbs from '@/components/elements/breadcrumbs';
import backgroundImage from '/images/background/leaves-background.webp';
import useTress from '@/hooks/use-trees';
import styles from './trees.module.css';
import Card from './card';
import treeIcon from '/images/misc/tree.png';

export default function Trees() {
  const { trees, isLoading, error } = useTress();

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
                {/* Put your sort/filter UI or anything else here */}
                <button className='mb-2 block w-full rounded bg-blue-500 p-2 text-white'>
                  Sort
                </button>
                <button className='mb-2 block w-full rounded bg-blue-500 p-2 text-white'>
                  Filter
                </button>
              </aside>

              {/* Main Content */}
              <main className='flex-1'>
                {/* A responsive grid for the cards */}
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
              </main>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
