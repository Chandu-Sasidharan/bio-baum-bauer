import leavesBackground from '../assets/images/news_images/leaves_background.png';
import { useEffect, useState } from 'react';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import { FaRegNewspaper } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { MdOutlineDateRange } from 'react-icons/md';
import { BiTagAlt } from 'react-icons/bi';
import { IoMdArrowBack } from 'react-icons/io';
import axios from '@/utils/axios';
import EachPageHeader from '../components/EachPageHeader';
import { Breadcrumb } from 'flowbite-react';
import { Link } from 'react-router-dom';

const NewsArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'News Article - Details';
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/newsArticle/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
        setError('Error fetching article');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // Go back function

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading)
    return (
      <div className='mt-10 text-center text-lg font-semibold'>Loading...</div>
    );
  if (error)
    return (
      <div className='mt-10 text-center text-lg font-semibold text-red-600'>
        {error}
      </div>
    );
  if (!article)
    return (
      <div className='mt-10 text-center text-lg font-semibold text-gray-500'>
        No article found.
      </div>
    );

  // if (!article.writer)
  //   return (
  //     <div className="text-gray-500 text-center text-lg font-semibold mt-10">
  //       Writer information is not available.
  //     </div>
  //   );

  return (
    <div className='bg-gray-light'>
      {article && (
        <div className='mb-0 mt-0'>
          <Breadcrumb
            aria-label='This is Breadcrumb showing the location of current page'
            className='bg-gray-50 px-5 py-3 dark:bg-gray-800'
          >
            <Breadcrumb.Item href='/' icon={HiHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href='/news' icon={FaRegNewspaper}>
              News
            </Breadcrumb.Item>
            <Breadcrumb.Item>{article.title}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      )}
      {/* <div className=" px-20 text-center">
        <EachPageHeader title={article.title} />
      </div> */}
      <div className='container mx-auto p-3'>
        <div className='mt-2 rounded-lg bg-white px-5 py-3'>
          <Link
            to='/news'
            className='bg-primary text-stone hover:bg-primary-light duration-4000 flex h-max w-max items-center justify-center gap-1 rounded-[10px] border-2 px-8 py-1 transition ease-linear'
            aria-label='Tree page'
          >
            <MdKeyboardDoubleArrowLeft size='1rem' />
            <span className='text-base'>back</span>
          </Link>
        </div>
      </div>
      <div className='container mx-auto px-3'>
        {' '}
        <div className='rounded-lg bg-white p-2 shadow-lg'>
          {article && (
            <div className='flex flex-col lg:flex-row'>
              <div className='w-full p-4 lg:w-1/4'>
                <h1 className='mb-2 text-2xl font-bold text-gray-900'>
                  {article.title}
                </h1>
                <hr className='mb-2' />
                <p className='mb-4 ml-3 flex items-center text-lg text-gray-600'>
                  <span className='flex items-center gap-1 font-semibold'>
                    <FaRegUser size='1.1rem' />
                    {article.writer ? (
                      <span>
                        {article.writer.firstName}&nbsp;
                        {article.writer.lastName}
                      </span>
                    ) : (
                      <span>No Writer Info</span>
                    )}
                  </span>
                </p>
                <p className='mb-4 ml-3 flex items-center text-lg text-gray-600'>
                  <span className='flex items-center gap-1 font-semibold'>
                    <MdOutlineDateRange size='1.3rem' />
                    <span>{new Date(article.dateCreated).toDateString()}</span>
                  </span>
                </p>
                <hr className='mb-2' />
                <div
                  className='prose lg:prose-lg mb-6 px-4'
                  dangerouslySetInnerHTML={article.content}
                />
                <Link
                  to='/news'
                  className='bg-primary text-stone hover:bg-primary-light duration-4000 flex h-max w-max items-center justify-center gap-1 rounded-[10px] border-2 px-3 py-1 transition ease-linear'
                >
                  <IoMdArrowBack className='text-2xl' />
                  <span>&nbsp;Go Back</span>
                </Link>
              </div>
              <img
                className='h-auto w-full rounded-r-lg object-cover lg:w-3/4'
                src={article.imageUrl}
                alt={article.title}
              />
            </div>
          )}
        </div>
      </div>
      <img className='w-full' src={leavesBackground} alt='Footer background' />
    </div>
  );
};

export default NewsArticle;
