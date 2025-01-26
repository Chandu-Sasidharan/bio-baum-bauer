import Hero from '@/pages/home/hero';
import More from '@/pages/home/more';
import Featured from '@/pages/home/featured';
import AdditionalLinks from '../../components/homePage/AdditionalLinks';

const Home = () => {
  return (
    <>
      <Hero />
      <More />
      <Featured />

      <section className='container-fluid'>
        <AdditionalLinks />
      </section>
    </>
  );
};

export default Home;
