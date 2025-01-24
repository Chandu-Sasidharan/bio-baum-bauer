/* eslint-disable no-empty-pattern */

import { HiHome } from 'react-icons/hi';
import axios from '@/utils/axios';
import { GrNext, GrPrevious } from 'react-icons/gr';
import '../assets/styles/Faq.css';
import backgroundImage from '../assets/images/leaves_background_02.webp';
import PageBreadcrumb from '../components/PageBreadcrumb';
import DefaultLoader from '../components/DefaultLoader';
import EachPageHeader from '../components/EachPageHeader';
import { useState, useEffect } from 'react';
import { IoIosSend } from 'react-icons/io';
import { Link } from 'react-router-dom';
import FaQItem from '../components/FaQItem';

const Faq = () => {
  const titles = ['FAQ', 'We have summarized your inquiries as following!'];
  const aLinkValues = [{ linkTo: '/', linkIcon: HiHome, linkText: 'Home' }];
  const daLinkValues = { linkText: 'FAQ' };

  const limit = 5;
  const [skip, setSkip] = useState(0);
  const [faqs, setFaqs] = useState([]);
  const [err, setErr] = useState('No data available yet!');
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handlePrev = () => {
    const newSkip = skip - limit;
    if (newSkip <= 0) {
      setSkip(0);
    }
    setSkip(newSkip);
  };
  const handleNex = () => {
    setSkip(limit + skip);
  };

  const getFaqs = () => {
    try {
      axios
        .get(`/api/faq/all?limit=${limit}&skip=${skip}`)
        .then(response => {
          if (response.status === 200) {
            setFaqs(response.data.data);
            setTotal(response.data.count);
            setIsLoading(false);
            setErr('');
          }
        })
        .catch(err => {
          if (err.response.status === 500) {
            setErr('No data available yet!');
          }
        });
    } catch (error) {
      console.error('Error fetching FAQs:', error.message);
      throw error;
    }
  };

  useEffect(() => {
    document.title = 'FAQs';
    getFaqs();
  }, [skip]);
  if (isLoading) {
    return (
      <div className='flex h-96 items-center justify-center'>
        <DefaultLoader errorMsg={err} />
      </div>
    );
  }

  return (
    <div className='bg-gray-light text-stone relative'>
      <PageBreadcrumb activeLinks={aLinkValues} deActiveLink={daLinkValues} />
      <div
        className='absolute left-0 right-0 top-[2.6rem] h-[25%] w-full bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: 0.2,
        }}
      ></div>
      <div className='flex h-full flex-col items-center justify-center gap-8 bg-white pb-16 lg:pb-56'>
        <EachPageHeader title={titles[0]} subtitle={titles[1]} />
        <div className='container mx-auto flex items-center justify-center pl-4 text-2xl lg:text-3xl'>
          <h2 className='font-chicle'>
            Showing {skip + 1} to {Math.min(skip + limit, total)} of {total} FAQ
          </h2>
        </div>
        {faqs.map((item, index) => (
          <FaQItem item={item} key={index} />
        ))}
        <br />
        <div className='mx-auto flex gap-7 text-lg md:text-2xl'>
          <button
            onClick={handlePrev}
            disabled={skip === 0}
            className={skip === 0 ? 'disabledBtn' : 'activeBtn'}
          >
            <GrPrevious />
          </button>
          <button
            onClick={handleNex}
            disabled={skip + limit >= total}
            className={skip + limit >= total ? 'disabledBtn' : 'activeBtn'}
          >
            <GrNext />
          </button>
        </div>
      </div>

      <div className='email relative overflow-hidden'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-1'>
            <div className='max-w-xl lg:max-w-lg'>
              <h2 className='text-5xl text-white'>
                Do you have More Questions?
              </h2>
              <p className='mt-4 text-2xl leading-8 text-gray-300'>
                write us here!! we will contact shortly through Email !!
              </p>
              <div className='mt-6 flex max-w-md justify-center gap-x-4'>
                <Link
                  type='submit'
                  className='bg-gray-light text-stone flex flex-row gap-1 rounded-md px-4 py-4 text-xl font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                  to={`/contact`}
                >
                  <IoIosSend className='text-2xl' /> Send a message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
