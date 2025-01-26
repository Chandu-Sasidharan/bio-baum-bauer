import Hero from '@/pages/home/hero';
import More from '@/pages/home/more';
import AdditionalLinks from '../../components/homePage/AdditionalLinks';
import FeaturedTrees from '../../components/homePage/FeaturedTrees';

const Home = () => {
  return (
    <>
      <Hero />
      <More />

      <section className='container-fluid bg-gray-light mx-auto'>
        <FeaturedTrees />
        <hr className='visible-none w-48' />
      </section>
      <section className='container-fluid'>
        <AdditionalLinks />
      </section>
    </>
  );
};

export default Home;
