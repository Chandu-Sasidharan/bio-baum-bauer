import AboutImage from '../../assets/images/aboutSolawi.webp';
import { Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';

import { Link } from 'react-router-dom';
const AboutSolawi = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full py-8 gap-5 md:flex-row px-4'>
      <article className='w-full text-stone flex flex-col gap-5 justify-center pt-6 sm:pt-3 sm:px-0'>
        <h2 className='text-2xl lg:text-3xl text-left'>
          About Us: Solawi Zabergäu
        </h2>
        <p className='font-semibold text-justify'>
          At Solawi Zabergäu, we're more than just farmers; we're stewards of
          the earth. Nestled in the lush valleys of Southern Germany, our
          community-supported agriculture initiative is dedicated to sustainable
          farming practices that respect and nourish the land. Our collective
          efforts focus on producing organic, locally-sourced food while
          strengthening the bond between the people and the planet. By
          supporting us, you become a part of a movement that cherishes nature's
          bounty and upholds the values of ecological responsibility and
          harmony.
        </p>
        <Link
          to='/about'
          className='mission-more mr-auto px-8 py-2 bg-primary text-stone rounded-[10px] hover:bg-primary-light transition duration-4000 ease-linear'
          aria-label='About Solawi page'
        >
          about us
        </Link>
      </article>
      <div className='w-full'>
        <div className='aboutSolawiImgDiv w-full overflow-hidden relative'>
          <img
            src={AboutImage}
            alt='About Solawi Image'
            className='aboutSolawiImg h-96 object-cover w-full transition-transform duration-700'
          />
          <div className='flex items-center justify-center transition-opacity duration-300 overlay absolute top-0 left-0 w-full h-full opacity-0 bg-gray-700 bg-opacity-40'>
            <p className=' text-white text-lg text-center '>
              <Link to='/about'>
                <Button pill color='gray'>
                  Read more about us
                  <HiOutlineArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutSolawi;
