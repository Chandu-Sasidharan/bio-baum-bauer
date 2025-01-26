import { Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';
import '../../assets/styles/homeComponents.css';
const AdditionalLinks = () => {
  return (
    <div className='connections w-full px-6 py-11 md:py-24 text-left relative'>
      <div className='container flex flex-col md:flex-row gap-12 mx-auto connect-detail text-left p-8'>
        <div className='w-full flex flex-col gap-2 text-primary-light justify-start border-b-2 md:border-b-0 py-3'>
          <h2 className='text-primary-light text-4xl'>News</h2>
          <p className='text-xl'>
            Here we have listed news about our business from the newest to
            latest.
          </p>
          <Link
            to='/news'
            className='self-end text-4xl hover:text-primary-dark transform hover:translate-x-2 motion-reduce:transition-none motion-reduce:hover:transform-none transition duration-5000 ease-linear'
          >
            <FaArrowRightLong />
          </Link>
        </div>
        <div className='w-full flex flex-col gap-2 text-primary-light justify-start border-b-2 md:border-b-0 py-3'>
          <h2 className='text-primary-light text-4xl'>Gallery</h2>
          <p className='text-xl'>
            A collections of images from our farm. Explore more our mission.
          </p>
          <Link
            to='/gallery'
            className='self-end text-4xl hover:text-primary-dark transform hover:translate-x-2 motion-reduce:transition-none motion-reduce:hover:transform-none transition duration-5000 ease-linear'
          >
            <FaArrowRightLong />
          </Link>
        </div>
        <div className='w-full flex flex-col gap-2 text-primary-light justify-start py-3'>
          <h2 className='text-primary-light text-4xl'>FAQs</h2>
          <p className='text-xl'>
            If you have any question, feel free to check here first. You may
            find the answer here.
          </p>
          <Link
            to='/faq'
            className='self-end text-4xl hover:text-primary-dark transform hover:translate-x-2 motion-reduce:transition-none motion-reduce:hover:transform-none transition duration-5000 ease-linear'
          >
            <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AdditionalLinks;
