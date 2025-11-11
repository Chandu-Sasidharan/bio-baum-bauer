import { FaYoutube, FaLocationDot, FaLinkedin } from 'react-icons/fa6';
import { BsTwitterX } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import SocialLink from '@/components/ui/social-link';
import MenuLink from '@/components/footer/menu-link';
import logoFooter from '/images/logo/bbb-logo-footer.svg';

export default function Upper() {
  return (
    <section className='bg-primary'>
      <div className='mx-auto flex max-w-7xl flex-col items-start gap-10 px-10 py-10 lg:flex-row'>
        {/* First Coloumn */}
        <div className='flex w-full lg:w-1/3'>
          <div className='space-y-5'>
            <div>
              <p className='flex items-center gap-3'>
                <img
                  src={logoFooter}
                  className='w-20 rounded-full shadow-lg'
                  alt='Bio Baum Bauer Logo'
                />
                <span className='font-chicle text-3xl tracking-wide'>
                  Bio Baum Bauer
                </span>
              </p>
              <p className='mt-3 font-sans text-lg'>
                Growing a greener tomorrow.
              </p>
            </div>
            <p className='mt-3 font-sans text-lg'>
              Sponsor a tree with BioBaumBauer
              <br />
              and nurture hope.
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
        <div className='flex w-full lg:mt-10 lg:w-1/3 lg:justify-center'>
          <div className='space-y-5'>
            <h3 className='flex items-baseline gap-3 font-sans text-lg font-bold uppercase'>
              Explore
            </h3>
            <div className='flex gap-16'>
              <div className='space-y-3'>
                <MenuLink to='/' pageName='Home' />
                <MenuLink to='/about' pageName='About' />
                <MenuLink to='/trees' pageName='Trees' />
                <MenuLink to='/impressions' pageName='Impressions' />
                <MenuLink to='/contact' pageName='Contact' />
              </div>
              <div className='space-y-3'>
                <MenuLink to='/faqs' pageName='FAQs' />
                <MenuLink to='/news' pageName='News' />
                <MenuLink to='/terms' pageName='Terms' />
                <MenuLink to='/privacy' pageName='Privacy' />
              </div>
            </div>
          </div>
        </div>

        {/* Third Coloumn */}
        <div className='flex w-full flex-col gap-5 lg:mt-10 lg:w-1/3 lg:items-center'>
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
            <a
              href='mailto:hello@biobaumbauer.de'
              className='text-gray hover:text-golden-red flex items-center gap-3 transition-colors duration-300'
            >
              <MdEmail />
              hello@biobaumbauer.de
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
