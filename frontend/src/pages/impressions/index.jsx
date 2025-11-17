import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Fade } from 'react-awesome-reveal';
import Spinner from '@/components/spinner';
import Button from '@/components/ui/button';
import backgroundImage from '/images/background/leaves-background.webp';
import useImpressions from '@/hooks/use-impressions';
import ImageModal from './modal';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    metaTitle: 'Eindrücke | Bio Baum Bauer',
    error: 'Bilder konnten nicht geladen werden.',
    note: 'Die folgenden Bilder sind KI-generiert und dienen nur zur Veranschaulichung.',
    showAll: 'Alle Bilder anzeigen',
    showLess: 'Weniger Fotos anzeigen',
  },
  en: {
    metaTitle: 'Impressions | Bio Baum Bauer',
    error: 'Error fetching images',
    note: 'Images are AI-generated and are for representative purposes only.',
    showAll: 'Show All Images',
    showLess: 'Show Fewer Photos',
  },
};

export default function Impressions() {
  const text = useCopy(copy);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { impressions, isLoading, isError } = useImpressions();

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
    return <div>{text.error}</div>;
  }

  /* Handle Close Image */
  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Helmet>
        <title>{text.metaTitle}</title>
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
            <h1 className='text-lg'>{text.note}</h1>
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
                {displayedImages.length === 6 ? text.showAll : text.showLess}
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
