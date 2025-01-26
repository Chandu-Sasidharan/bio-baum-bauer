import { Link } from 'react-router-dom';
import logoImage from '../../assets/images/BioBaumBauer_Logo.svg';
import heroBgImage from '../../assets/images/home-hero-bg-image.jpg';
import { MdReadMore } from 'react-icons/md';
import '../../assets/styles/Hero.css';

const HeroSection = () => {
  const heroSectionStyle = {
    backgroundImage: `url(${heroBgImage})`,
  };
  return (
    <section
      className='hero-section w-full h-[650px] xs:h-[700px] sm:h-[600px] md:h-[800px] bg-cover object-cover bg-left-bottom'
      style={heroSectionStyle}
    >
      {/* Logo Image */}
      <div className='flex justify-center items-start pt-4 md:pt-8'>
        <img
          src={logoImage}
          alt='BioBaumBauer Logo'
          className='h-[150px] w-[150px] md:h-[350px] md:w-[350px]'
          width='100%'
          height='100%'
        />
      </div>

      {/* Hero Text and Button */}
      <div className='w-[90%] md:w-[80%] lg:w-[60%] xl:w-[40%] m-auto'>
        <div className='flex flex-col justify-center items-center mt-8'>
          <h1 className='text-5xl md:text-6xl text-white font-chicle tracking-wide text-center'>
            Plant Today, Prosper Tomorrow
          </h1>
          <p className='mt-2 text-[1rem] md:text-[1.2rem] text-white text-center '>
            Embrace a greener future with Bio Baum Bauer's Green Legacy
            initiative. Your sponsorship plants a tree in Southern Germany,
            fostering sustainability and ecological balance. Each tree bolsters
            biodiversity, contributing to a healthier planet. Sponsor a tree and
            transform your ecological footprint into a beacon of life for
            tomorrow. Join us in nurturing growth for a cleaner, thriving world.{' '}
          </p>
          <Link
            to='/trees'
            className='mx-auto flex items-center gap-2 px-8 py-2 mt-4 bg-primary text-stone rounded-[10px] hover:bg-primary-light transition duration-4000 ease-linear'
            aria-label='Sponsor page'
          >
            <MdReadMore size='1.4rem' /> <span>read more...</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
