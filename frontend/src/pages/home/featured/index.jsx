import { Link } from 'react-router-dom';
import Spinner from '@/components/spinner';
import useFeaturedTrees from '@/hooks/use-featured-trees';
import Card from './card';
import styles from './featured.module.css';

const FeaturedTrees = () => {
  const { featuredTrees, isLoading, isError } = useFeaturedTrees();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error fetching data!</div>;
  }

  return (
    <section className='bg-gray-light py-16 md:py-24'>
      <div className='space-y-3 p-5 text-center md:space-y-5'>
        <h2 className='text-3xl tracking-wider md:text-4xl'>Featured Trees</h2>
        <p className='text-stone font-lg'>
          The following trees are among the rarest to cultivate or are in urgent
          need of care.
        </p>
        <div className={styles.cardContainer}>
          {featuredTrees.map(tree => (
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
    </section>
  );
};
export default FeaturedTrees;
