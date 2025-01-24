import { useEffect, useState } from 'react';
import axios from '@/utils/axios';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { HiHome } from 'react-icons/hi';
import { useMediaQuery } from 'react-responsive';
import PageBreadcrumb from '../components/PageBreadcrumb';
import EachPageHeader from '../components/EachPageHeader';
import { Fade } from 'react-awesome-reveal';
import newSFooterImg from '../assets/images/news_images/leaves_background.png';
import backgroundImage from '../assets/images/leaves_background_03.webp';
import DefaultLoader from '../components/DefaultLoader';

const News = () => {
  const titles = [
    'Bio Baum News',
    'Discover the Latest Stories and Updates from Our Tree Sponsorship Program!',
  ];
  const aLinkValues = [{ linkTo: '/', linkIcon: HiHome, linkText: 'Home' }];
  const daLinkValues = { linkText: 'News' };

  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('No data available yet!');
  const [totalNews, setTotalNews] = useState(0);
  //pagination
  const [skip, setSkip] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(
    useMediaQuery({ query: '(max-width: 768px)' })
  );
  const limit = isSmallScreen ? 4 : 8;

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  const humanReadableDate = date => {
    const newDate = new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return newDate;
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize); // add an event listener for the resize event on the window object.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handlePrev = () => {
    const newSkip = skip - limit;
    if (newSkip < 0) {
      setSkip(0);
    } else {
      setSkip(newSkip);
    }
  };

  const handleNex = () => {
    const newSkip = skip + limit;
    if (newSkip >= totalNews) {
      setSkip(skip);
    } else {
      setSkip(newSkip);
    }
  };
  const getNewsArticles = () => {
    try {
      axios
        .get(`/api/newsArticle/?limit=${limit}&skip=${skip}`)
        .then(response => {
          if (response.status === 200) {
            setNewsItems(response.data.articles);
            setTotalNews(response.data.total);
            setIsLoading(false);
            setError('');
          }
        })
        .catch(error => {
          if (error.response.status === 500) {
            setError('No data available yet!');
          }
        });
    } catch (error) {
      console.error('Error fetching NewsArticles:', error.message);
    }
  };

  useEffect(() => {
    document.title = 'News';
    getNewsArticles();
  }, [skip, isSmallScreen]); // this func is updated based on changes in skip and isSmallScreen

  if (isLoading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <DefaultLoader errorMsg={error} />
      </div>
    );
  }

  return (
    <div className='bg-gray-light'>
      <PageBreadcrumb activeLinks={aLinkValues} deActiveLink={daLinkValues} />
      {/* Overlay with background image and opacity */}
      <div
        className='bg-primary absolute left-0 h-[50%] w-full bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: 0.1,
        }}
      ></div>
      <EachPageHeader title={titles[0]} subtitle={titles[1]} />
      <div className='container mx-auto flex justify-center pl-4 text-2xl lg:text-3xl'>
        <h2>
          Showing {skip + 1} to {Math.min(skip + limit, totalNews)} of{' '}
          {totalNews} News Articles
        </h2>
        <p>{error}</p>
      </div>
      <div className='container mx-auto px-4 py-4 md:py-6 lg:py-8'>
        <Fade delay={100} cascade damping={0.1} duration={3000}>
          <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4'>
            {newsItems.map(item => (
              <div
                key={item._id}
                className='flex flex-col justify-between overflow-hidden rounded-lg border border-gray-200 bg-white shadow hover:rounded-lg hover:shadow-lg dark:border-gray-700 dark:bg-gray-800'
              >
                <Link to={`/news/${item._id}`}>
                  <img
                    className='h-48 w-full object-cover' // Fixed height for all news thumbnail images
                    src={item.imageUrl}
                    alt={item.title}
                  />
                </Link>
                <div className='flex h-full flex-col justify-between p-5'>
                  <div>
                    <Link to={`/news/${item._id}`}>
                      <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white'>
                        {item.title}
                      </h5>
                    </Link>
                    <p className='text-s py-2 pt-1 text-lg font-bold text-gray-400'>
                      {humanReadableDate(item.dateCreated)}
                    </p>
                    <p className='mb-3 hidden font-normal text-gray-700 lg:flex dark:text-gray-400'>
                      {item.description.length > 100
                        ? `${item.description.slice(0, 100)}...`
                        : item.description}
                    </p>
                  </div>
                  <Link
                    to={`/news/${item._id}`}
                    className='text-s text-accent mt-4 inline-flex items-center py-1 text-center font-medium hover:underline'
                  >
                    Continue Reading <IoIosArrowForward />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Fade>
      </div>
      {/* pagination buttons */}
      <div className='text-stone m-4 flex justify-center gap-10 text-2xl md:text-2xl'>
        <button
          onClick={handlePrev}
          disabled={skip === 0}
          className={skip === 0 ? 'disabledBtn' : 'activeBtn'}
        >
          <GrPrevious />
        </button>
        <button
          onClick={handleNex}
          disabled={skip + limit >= totalNews}
          className={skip + limit >= totalNews ? 'disabledBtn' : 'activeBtn'}
        >
          <GrNext />
        </button>
      </div>
      {/* Footer Image */}
      <img
        className='bg-gray-light w-full'
        src={newSFooterImg}
        alt='News Footer Image'
      />
    </div>
  );
};

export default News;
