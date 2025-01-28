import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Spinner from '@/components/elements/spinner';
import Breadcrumbs from '@/components/elements/breadcrumbs';
import Card from '@/components/elements/card';
import treeIcon from '/images/misc/tree.png';
import backgroundImage from '/images/background/leaves-background.webp';
import cardStyles from '@/components/elements/card/card.module.css';
import useTress from '@/hooks/use-trees';

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

      {/* Container */}
      <section
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className='bg-cover bg-center bg-no-repeat'
      >
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          {/* Breadcrumbs */}
          <div className='w-full px-5'>
            <Breadcrumbs />
          </div>

          {/* Content */}
          <div className='mx-auto my-5 max-w-7xl space-y-10 p-5 md:my-10'>
            <p className='font-chicle space-x-3 text-center text-3xl tracking-wide md:text-4xl'>
              <img
                src={treeIcon}
                alt='Small Photo'
                className='mb-1 inline-block h-8 w-8'
              />
              <span>Sponsor a tree, leave a lasting legacy.</span>
            </p>
            {/* Cards */}
            <div className={cardStyles.cardContainer}>
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
          </div>
        </div>
      </section>
    </>
  );
}
