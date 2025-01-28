import { Link } from 'react-router-dom';
import Card from '@/components/elements/card';
import cardStyles from '@/components/elements/card/card.module.css';
import Spinner from '@/components/elements/spinner';
import useFeaturedTrees from '@/hooks/use-featured-trees';

const FeaturedTrees = () => {
  const { featuredTrees, loading } = useFeaturedTrees();

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className='bg-gray-light py-16 md:py-24'>
      <div className='space-y-3 p-5 text-center md:space-y-5'>
        <h2 className='text-3xl tracking-wider md:text-4xl'>Featured Trees</h2>
        <p className='text-stone font-lg'>
          The following trees are among the rarest to cultivate or are in urgent
          need of care.
        </p>
        <div className={cardStyles.cardContainer}>
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
