import Card from '@/components/elements/card';
import Spinner from '@/components/elements/spinner';
import useFeaturedTrees from '@/hooks/use-featured-trees';

const FeaturedTrees = () => {
  const { featuredTrees, loading } = useFeaturedTrees();

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className='bg-gray-light py-16 md:py-24'>
      <div className='flex flex-col justify-center gap-3 text-center'>
        <h2 className='text-3xl tracking-wider md:text-4xl'>Featured Trees</h2>
        <p className='text-stone font-lg'>
          The following trees are among the rarest to cultivate or are in urgent
          need of care.
        </p>
        <div className='mt-8 flex flex-wrap justify-center gap-12'>
          {featuredTrees.map(tree => (
            <Card
              key={tree._id}
              image={tree.imageUrl}
              name={tree.name}
              price={tree.price.$numberDecimal}
              id={tree._id}
            >
              Plant Now
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeaturedTrees;
