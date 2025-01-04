import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaAddressBook } from 'react-icons/fa';
import { FaYoutube, FaLocationDot, FaLinkedin } from 'react-icons/fa6';
import { BsTwitterX } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import SocialLink from '@/components/elements/social-link';
import MenuLink from '@/components/footer/menu-link';

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
                <h3 className='text-3xl font-chicle'>Bio Baum Bauer</h3>
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
            <h3 className='flex items-baseline gap-3 font-sans text-lg font-bold uppercase'>
              Explore
            </h3>
            <div className='flex gap-16'>
              <div className='space-y-3'>
                <MenuLink to='/' pageName='Home' />
                <MenuLink to='/trees' pageName='Trees' />
                <MenuLink to='/news' pageName='News' />
                <MenuLink to='/about' pageName='About' />
                <MenuLink to='/gallery' pageName='Gallery' />
              </div>
              <div className='space-y-3'>
                <MenuLink to='/faq' pageName='FAQs' />
                <MenuLink to='/contact' pageName='Contact' />
                <MenuLink to='/terms' pageName='Terms' />
                <MenuLink to='/privacy' pageName='Privacy' />
              </div>
            </div>
          </div>
        </div>
        {/* Third Coloumn */}
        <div className='flex lg:items-center flex-col gap-5 w-full lg:w-1/3 lg:mt-10'>
          <div className='space-y-5'>
            <h3 className='flex items-center gap-3 font-sans text-lg font-bold uppercase'>
              Address
            </h3>
            <div className='flex items-start gap-3'>
              <FaLocationDot />
              <p className='-mt-1'>
                Schulgasse 9, <br /> 74336 Brackenheim, <br />{' '}
                Baden-Württemberg, Germany
              </p>
            </div>
            <Link
              href='mailto:hello@biobaumbauer.de'
              className='flex items-center gap-3 text-gray hover:text-golden-red transition-colors duration-300'
            >
              <MdEmail />
              hello@biobaumbauer.de
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
