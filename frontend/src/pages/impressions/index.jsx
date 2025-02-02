import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Fade } from 'react-awesome-reveal';
import Spinner from '@/components/elements/spinner';
import Button from '@/components/elements/button';
import backgroundImage from '/images/background/leaves-background.webp';
import useImpressions from '@/hooks/use-impressions';
import ImageModal from './modal';

export default function Impressions() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { impressions, isLoading, isError, error } = useImpressions();

  // Check if the screen is small
  useEffect(() => {
    if (window.innerWidth > 768) {
      setIsSmallScreen(true);
    }
  }, []);

  // Check if the screen is resized
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Set displayed images
  useEffect(() => {
    if (impressions) {
      setDisplayedImages(isSmallScreen ? impressions.slice(0, 6) : impressions);
    }
  }, [impressions, isSmallScreen]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error fetching images</div>;
  }

  /* Handle Close Image */
  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Helmet>
        <title>Impressions | Bio Baum Bauer</title>
      </Helmet>

      {/* Container */}
      <section
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className='bg-cover bg-center bg-no-repeat'
      >
        <div
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
          className='md:py-15 px-5 py-10 md:px-10'
        >
          <div className='mx-auto max-w-7xl space-y-5'>
            <h1 className='text-lg'>
              Images are AI-generated and are for representative purposes only.
            </h1>
            {/* Image Grid */}
            <Fade delay={100} cascade damping={0.1} duration={3000}>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                {displayedImages.map((image, index) => (
                  <div
                    key={index}
                    className='border-primary relative aspect-square cursor-pointer overflow-hidden border'
                    onClick={() => setSelectedImage(image)}
                    onMouseEnter={() => setHoveredImage(index)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className='h-full w-full object-cover transition-all duration-300'
                    />
                    <div
                      className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-transform duration-300 ${
                        hoveredImage === index ? 'scale-100' : 'scale-0'
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

            {/*  Toggle button to show more/fewer images */}
            {isSmallScreen && (
              <Button
                onClick={() =>
                  setDisplayedImages(
                    displayedImages.length === 6
                      ? impressions
                      : impressions.slice(0, 6)
                  )
                }
                variant='primary'
                rounded={true}
                className='w-full'
              >
                {displayedImages.length === 6
                  ? 'Show All Images'
                  : 'Show Fewer Photos'}
              </Button>
            )}
          </div>
        </div>

        {/* Modal for Selected Image */}
        {selectedImage && (
          <ImageModal image={selectedImage} closeImage={closeImage} />
        )}
      </section>
    </>
  );
}
