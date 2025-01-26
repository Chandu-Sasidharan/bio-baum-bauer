import { Link } from 'react-router-dom';
import LeftImg from '../../assets/images/mission.jpeg';
import '../../assets/styles/homeComponents.css';
import { Button } from 'flowbite-react';
import { HiOutlineArrowRight } from 'react-icons/hi';

const Mission = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full py-8 gap-6 md:flex-row px-4'>
      <div className='w-full'>
        <div className='mImgDiv w-full overflow-hidden relative'>
          <img
            src={LeftImg}
            alt='Mission Image'
            className='missionImage h-96 object-cover w-full transition-transform duration-700'
          />
          <div className='flex items-center justify-center transition-opacity duration-300 overlay absolute top-0 left-0 w-full h-full opacity-0 bg-gray-700 bg-opacity-40'>
            <p className=' text-white text-lg text-center '>
              <Link to='/trees'>
                <Button pill color='gray'>
                  Trees for sponsoring
                  <HiOutlineArrowRight className='ml-2 h-5 w-5' />
                </Button>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <article className='flex flex-col justify-center items-start gap-3 w-full text-stone'>
        <h2 className='text-2xl lg:text-3xl text-left'>
          Sponsor a Tree: Our Mission
        </h2>
        <p className='font-semibold text-justify'>
          Join us in a green revolution with a simple act that leaves a lasting
          impact. Our mission is to enrich the South German landscape by
          planting a tree for every sponsorship we receive. Each tree
          contributes to the biodiversity of the region, supports local
          ecosystems, and combats climate change. When you sponsor a tree,
          you're not just planting roots in the ground; you're growing a legacy
          that will flourish for generations to come.
        </p>
        <Link
          to='/trees'
          className='mission-more mr-auto px-8 py-2 bg-primary text-stone rounded-[10px] hover:bg-primary-light transition duration-4000 ease-linear'
          aria-label='Sponsor page'
        >
          sponsor a tree
        </Link>
      </article>
    </div>
  );
};
export default Mission;
