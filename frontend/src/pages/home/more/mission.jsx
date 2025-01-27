import { Link } from 'react-router-dom';
import Button from '@/components/elements/button';
import { FaArrowRightLong } from 'react-icons/fa6';
import missionImage from '/images/more/mission.jpeg';
import styles from './more.module.css';

export default function Mission() {
  return (
    <div className='mx-auto my-7 flex max-w-7xl flex-col items-center justify-center gap-10 p-5 md:my-20 md:flex-row-reverse md:gap-16'>
      <article className='text-stone flex w-full flex-col items-start justify-center gap-3 md:w-1/2'>
        <h2 className='text-sage text-2xl tracking-wider'>Our Mission</h2>
        <h3 className='text-accent text-3xl font-semibold'>
          Empowering Growth,
          <br />
          Nurturing Sustainability
        </h3>
        <p className='text-lg'>
          At the core of our mission is a commitment to reconnect people with
          nature through transformative initiatives. By planting and nurturing
          trees, we combat climate change, enhance biodiversity, and foster
          environmental stewardship. Our goal is to inspire communities to join
          hands in creating a healthier, greener planet for future generations.
          It is a collective journey - one where every tree, every volunteer,
          and every act of kindness contributes to a more vibrant and
          sustainable future.
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
          src={missionImage}
          alt='Mission Image'
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
