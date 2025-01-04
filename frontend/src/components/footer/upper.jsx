import { Link } from 'react-router-dom';
import { MdDoubleArrow } from 'react-icons/md';
import { FaExternalLinkAlt, FaAddressBook } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa6';
import { BsTwitterX } from 'react-icons/bs';
import { FaLinkedin } from 'react-icons/fa6';
import SocialLink from '@/components/elements/social-link';

import logoFooter from '/images/logo/bbb-logo-footer.svg';

export default function Upper() {
  return (
    <section className='bg-primary'>
      <div className='max-w-7xl mx-auto flex flex-col lg:flex-row items-start py-10 px-10 gap-10'>
        {/* First Coloumn */}
        <div className='flex w-full lg:w-1/3'>
          <div className='space-y-5'>
            <div>
              <p className='flex items-center gap-3'>
                <img
                  src={logoFooter}
                  className='w-20 shadow-lg rounded-full'
                  alt='Bio Baum Bauer Logo'
                />
                <span className='text-3xl font-chicle'>Bio Baum Bauer</span>
              </p>
              <p className='font-sans text-lg mt-3'>
                Growing a greener tomorrow.
              </p>
            </div>
            <p className='font-sans text-lg mt-3'>
              Sponsor a tree with BioBaumBauer and nurture hope today.
            </p>
            <div className='space-y-3'>
              <p className='text-lg font-bold'>Follow Us</p>
              <div className='flex gap-5 text-base'>
                <SocialLink>
                  <FaLinkedin />
                </SocialLink>
                <SocialLink>
                  <FaYoutube />
                </SocialLink>
                <SocialLink>
                  <BsTwitterX />
                </SocialLink>
              </div>
            </div>
          </div>
        </div>
        {/* Second Coloumn */}
        <div className='flex lg:justify-center w-full lg:w-1/3 lg:mt-10'>
          <div className='space-y-5'>
            <h2 className='flex items-baseline gap-3 font-sans text-lg font-bold'>
              <FaExternalLinkAlt />
              <span>Links to Pages</span>
            </h2>
            <div className='flex gap-16'>
              <div className='space-y-3'>
                <Link
                  to='/'
                  className='flex items-center gap-1  transform hover:translate-x-2 motion-reduce:transition-none motion-reduce:hover:transform-none hover:text-white transition duration-5000 ease-linear  '
                >
                  <MdDoubleArrow />
                  <span>Home</span>
                </Link>
                <Link
                  to='/trees'
                  className='flex items-center gap-1  transform hover:translate-x-2 motion-reduce:transition-none motion-reduce:hover:transform-none hover:text-white transition duration-5000 ease-linear '
                >
                  <MdDoubleArrow />
                  <span>Trees</span>
                </Link>
                <Link
                  to='/news'
                  className='flex items-center gap-1  transform hover:translate-x-2 motion-reduce:transition-none motion-reduce:hover:transform-none hover:text-white transition duration-5000 ease-linear '
                >
                  <MdDoubleArrow />
                  <span>News</span>
                </Link>
                <Link
                  to='/about'
                  className='flex items-center gap-1  transform hover:translate-x-2 motion-reduce:transition-none motion-reduce:hover:transform-none hover:text-white transition duration-5000 ease-linear '
                >
                  <MdDoubleArrow />
                  <span>About</span>
                </Link>
                <Link
                  to='/gallery'
                  className='flex items-center gap-1  transform hover:translate-x-2 motion-reduce:transition-none motion-reduce:hover:transform-none hover:text-white transition duration-5000 ease-linear '
                >
                  <MdDoubleArrow />
                  <span>Gallery</span>
                </Link>
              </div>
              <div className='space-y-3'>
                <Link
                  to='/faq'
                  className='flex items-center gap-1  transform hover:translate-x-2 motion-reduce:transition-none motion-reduce:hover:transform-none hover:text-white transition duration-5000 ease-linear '
                >
                  <MdDoubleArrow />
                  <span>FAQs</span>
                </Link>
                <Link
                  to='/contact'
                  className='flex items-center gap-1  transform hover:translate-x-2 motion-reduce:transition-none motion-reduce:hover:transform-none hover:text-white transition duration-5000 ease-linear '
                >
                  <MdDoubleArrow />
                  <span>Contact</span>
                </Link>
                <Link
                  to='/terms'
                  className='flex items-center gap-1  transform hover:translate-x-2 motion-reduce:transition-none motion-reduce:hover:transform-none hover:text-white transition duration-5000 ease-linear '
                >
                  <MdDoubleArrow />
                  <span>Terms</span>
                </Link>
                <Link
                  to='/privacy'
                  className='flex items-center gap-1  transform hover:translate-x-2 motion-reduce:transition-none motion-reduce:hover:transform-none hover:text-white transition duration-5000 ease-linear '
                >
                  <MdDoubleArrow />
                  <span>Privacy</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Third Coloumn */}
        <div className='flex lg:items-center flex-col gap-5 w-full lg:w-1/3 lg:mt-10'>
          <div className='space-y-5'>
            <h3 className='flex items-center gap-3 font-sans text-lg font-bold'>
              <FaAddressBook />
              <span>Address</span>
            </h3>
            <p>
              Schulgasse 9, <br /> 74336 Brackenheim, <br /> Baden-Württemberg,
              Germany
            </p>
            <a
              href='mailto:hello@biobaumbauer.de'
              className='inline-block text-gray hover:text-white transition-colors duration-300'
            >
              hello@biobaumbauer.de
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
