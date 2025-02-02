import { Fade } from 'react-awesome-reveal';
import closeIcon from '/images/misc/close-icon.svg';

export default function ImageModal({ image, closeImage }) {
  return (
    <div
      className='fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50 pt-32'
      onClick={closeImage}
    >
      <Fade delay={100} cascade damping={0.1} duration={1000}>
        <div className='relative flex flex-col bg-white p-2'>
          <button
            onClick={closeImage}
            className='mb-2 h-[25px] w-[25px] self-end'
            aria-label='Close Modal'
          >
            {/* Close Icon */}
            <img src={closeIcon} alt='Close Menu' />
          </button>
          <div className='flex flex-col items-center'>
            {/* Image */}
            <img
              src={image.imageUrl}
              alt={`Selected Image ${image.title}`}
              className='h-[70vh] w-full object-cover'
            />
            <p className='text-primary-dark mt-1 max-w-xs text-center text-lg'>
              {image.title}
            </p>
          </div>
        </div>
      </Fade>
    </div>
  );
}
