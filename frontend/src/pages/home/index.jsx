import Hero from '@/pages/home/hero';
import Mission from '../../components/homePage/Mission';
import AboutSolawi from '../../components/homePage/AboutSolawi';
import AdditionalLinks from '../../components/homePage/AdditionalLinks';
import FeaturedTrees from '../../components/homePage/FeaturedTrees';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      <section className='container mx-auto flex w-full flex-col items-center justify-center pb-8 pt-8'>
        <div className='w-24 rounded-3xl border-b-4 border-solid border-gray-400'></div>
        <Mission />
        <hr className='visible-none w-48' />
        <AboutSolawi />
        <hr className='visible-none w-48' />
      </section>
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
