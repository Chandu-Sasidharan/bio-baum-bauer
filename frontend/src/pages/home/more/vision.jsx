import { Link } from 'react-router-dom';
import Button from '@/components/elements/button';
import { FaArrowRightLong } from 'react-icons/fa6';
import visionImage from '/images/more/vision.webp';
import styles from './more.module.css';

export default function Mission() {
  return (
    <div className='mx-auto my-7 flex max-w-7xl flex-col items-center justify-center gap-10 p-5 md:my-20 md:flex-row md:gap-16'>
      <article className='text-stone flex w-full flex-col items-start justify-center gap-3 md:w-1/2'>
        <h2 className='text-sage text-2xl tracking-wider'>Our Vision</h2>
        <h3 className='text-accent text-3xl font-semibold'>
          A Greener Tomorrow,
          <br />
          One Tree at a Time
        </h3>
        <p className='text-lg'>
          We envision a world where humanity thrives in harmony with nature.
          Through sustainable practices, education, and active community
          engagement, we aim to cultivate a legacy of ecological balance and
          social empowerment, ensuring a vibrant and sustainable future for all.
        </p>
        <Link to='/trees' className='mt-2'>
          <Button primary={true} rounded={true}>
            <span className='flex items-center gap-2'>
              <span>Learn More</span>
              <FaArrowRightLong className='transition-transform duration-300' />
            </span>
          </Button>
        </Link>
      </article>
      <div
        className={`relative w-full md:h-96 md:w-1/2 ${styles.imageContainer}`}
      >
        <img
          src={visionImage}
          alt='Vision Image'
          className={`${styles.image}`}
        />
        <div
          className={`${styles.overlay} flex flex-col items-center justify-center`}
        >
          <Link to='/trees'>
            <Button primary={true} rounded={true}>
              <span className='flex items-center gap-2'>
                <span>Sponsor a tree</span>
                <FaArrowRightLong className='transition-transform duration-300' />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
