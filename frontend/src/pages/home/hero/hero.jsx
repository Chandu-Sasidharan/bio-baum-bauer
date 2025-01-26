import { Link } from 'react-router-dom';
import logoImage from '/images/logo/bbb-logo.svg';
import { FaArrowRightLong } from 'react-icons/fa6';
import style from '@/pages/home/hero/hero.module.css';
import Button from '@/components/elements/button';

export default function Hero() {
  return (
    <section
      className={`flex flex-col items-center justify-center gap-5 ${style.hero}`}
    >
      <img
        src={logoImage}
        alt='BioBaumBauer Logo'
        className='z-[1] hidden md:h-[300px] md:w-[300px] lg:block'
      />
      <div className='z-[1] flex max-w-6xl flex-col items-center gap-5 px-5 text-center text-white'>
        <h1 className='font-chicle text-4xl tracking-wide sm:text-5xl md:text-6xl'>
          Plant today for a greener tomorrow
        </h1>
        <div className='text-lg'>
          <p>
            Join Bio Baum Bauer's Green Legacy initiative and sponsor a tree in
            Southern Germany.
          </p>
          <p>
            Help preserve biodiversity, foster ecological balance, and create a
            lasting impact for a greener tomorrow.
          </p>
        </div>
        <div className='flex gap-4'>
          <Link to='/trees'>
            <Button>Plant a Tree</Button>
          </Link>
          <Link to='#more'>
            <Button>
              <span className='flex items-center gap-2'>
                <span>Learn More</span>
                <FaArrowRightLong />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
