import { useState, useEffect } from 'react';
import backgroundImage from '../assets/images/gallery_images/leaves_background_03.png';
import closeMenu from '../assets/images/close_menu.svg';
import { Fade } from 'react-awesome-reveal';
import { HiHome } from 'react-icons/hi';
import PageBreadcrumb from '../components/PageBreadcrumb';
import DefaultLoader from '../components/DefaultLoader';
import axios from '@/utils/axios';

const Gallery = () => {
  document.title = 'Gallery';
  const [selectedImg, setSelectedImg] = useState(null);
  const [showAllImages, setShowAllImages] = useState(window.innerWidth > 1000);
  const [selectedIndex, setSelectedIndex] = useState(null); // Add this line
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('No image available yet!');

  /* Getting Gallery from Database! */
  const getGalleryImage = () => {
    try {
      axios
        .get(`/api/gallery`)
        .then(response => {
          if (response.status === 200) {
            setGallery(response.data);
            setIsLoading(false);
            setError('');
          }
        })
        .catch(err => {
          if (err.response.status === 500) {
            setError('Data was not brought');
          }
        });
    } catch (error) {
      console.error('Error fetching Images:', error.message);
      throw error;
    }
  };

  /* Handele ShowAllImages and ShowFewerImages on Screens <= 1024 */
  useEffect(() => {
    getGalleryImage();
    const handleResize = () => {
      if (window.innerWidth > 1000 && !showAllImages) {
        setShowAllImages(true);
      } else if (window.innerWidth <= 1024 && showAllImages) {
        setShowAllImages(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showAllImages]);

  const toggleShowAllImages = () => {
    setShowAllImages(!showAllImages);
  };

  const filteredGallery = showAllImages ? gallery : gallery.slice(0, 6);

  /* Handle Open Image */
  const openImage = img => {
    setSelectedImg(img);
  };

  /* Handle Close Image */
  const closeImage = () => {
    setSelectedImg(null);
  };

  const aLinkValues = [{ linkTo: '/', linkIcon: HiHome, linkText: 'Home' }];
  const daLinkValues = { linkText: 'Gallery' };

  if (isLoading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <DefaultLoader errorMsg={error} />
      </div>
    );
  }

  return (
    <div className='bg-gray-light text-stone'>
      <PageBreadcrumb activeLinks={aLinkValues} deActiveLink={daLinkValues} />
      <div className='relative mx-auto flex w-full p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px]'>
        {/* Overlay with background image and opacity */}
        <div
          className='absolute left-0 top-0 h-full w-full bg-contain bg-top bg-no-repeat'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.1 }}
        ></div>
        <div className='z-9 relative'>
          <h2 className='font-chicle mb-[15px] mt-[38px] text-center text-5xl tracking-wide text-[#5A6448] md:mt-[68px] md:text-7xl lg:mt-[88px] xl:mt-[108px]'>
            Gallery
          </h2>
          {/* Gallery Page Description */}
          <p className='text-stone text-md mx-auto mb-[25px] w-[90%] text-center sm:w-[90%] md:mb-[40px] md:w-[80%] lg:mb-[50px] lg:w-[70%] lg:text-xl xl:mb-[60px] xl:w-[60%] xl:text-2xl'>
            Welcome to our gallery, where each tree tells a story of growth,
            resilience, and the enduring bond between nature and us. This
            collection of images captures the heart of our tree sponsorship
            program - a testament to the positive impact we can make on the
            environment and future generations. Journey through the seasons with
            us and witness the remarkable transformation of each tree, fostered
            by the care and dedication of our community of sponsors.
          </p>
          {/* Image content */}
          <Fade delay={100} cascade damping={0.1} duration={3000}>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:px-20 xl:px-40'>
              {filteredGallery.map((image, index) => (
                <div
                  key={index}
                  className='border-primary relative aspect-square cursor-pointer overflow-hidden border'
                  onClick={() => openImage(image)}
                  style={{
                    backgroundImage: `url(${image.image})`,
                    backgroundSize: 'cover',
                    borderWidth: '2px',
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onMouseLeave={() => setSelectedIndex(null)}
                >
                  <img
                    src={image.image}
                    alt={`Image ${image.image}`}
                    className='h-full w-full object-cover transition-all duration-300'
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-transform duration-300 ${
                      selectedIndex === index ? 'scale-100' : 'scale-0'
                    }`}
                  >
                    <p className='whitespace-normal text-center text-xl text-white md:text-base lg:text-lg'>
                      {image.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Fade>
          {/* Toggle Button for Show All/Fewer Images */}
          <button
            onClick={toggleShowAllImages}
            className='bg-primary text-stone hover:bg-primary-light duration-4000 mx-auto mt-4 block rounded-[10px] px-8 py-2 transition ease-linear lg:hidden'
            aria-label='Show All/Fewer Images'
          >
            {showAllImages ? 'Show Fewer Photos' : 'Show All Images'}
          </button>
        </div>
        {/* Modal for Selected Image */}
        {selectedImg && (
          <div
            className='fixed bottom-0 left-0 right-0 top-0 z-[99] flex items-center justify-center bg-black bg-opacity-50'
            onClick={closeImage}
          >
            <Fade delay={100} cascade damping={0.1} duration={1000}>
              <div
                className='relative bg-white p-2'
                onClick={e => e.stopPropagation()}
              >
                <div className='mb-2 flex justify-end p-2'>
                  {/* Close Menu Button */}
                  <button
                    onClick={closeImage}
                    className='h-[25px] w-[25px] text-lg font-bold'
                    aria-label='Close modal'
                  >
                    <img src={closeMenu} alt='Close Menu' />
                  </button>
                </div>
                <img
                  src={selectedImg.image}
                  alt={`Selected Image ${selectedImg.title}`}
                  className='h-[400px] w-full sm:h-[500px] md:h-[700px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px]'
                  onDoubleClick={closeImage}
                />
                {/* Image Title */}
                <div className='absolute bottom-0 left-0 right-0 p-2 text-center'>
                  <p className='text-gray-dark bg-white bg-opacity-80 p-4 text-xl'>
                    {selectedImg.title}
                  </p>
                </div>
              </div>
            </Fade>
          </div>
        )}
      </div>
    </div>
  );
};
export default Gallery;
