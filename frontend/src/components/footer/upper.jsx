import { FaYoutube, FaLocationDot, FaLinkedin } from 'react-icons/fa6';
import { BsTwitterX } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import SocialLink from '@/components/ui/social-link';
import MenuLink from '@/components/footer/menu-link';
import logoFooter from '/images/logo/bbb-logo-footer.svg';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    tagline: 'Wir lassen eine grünere Zukunft wachsen.',
    sponsor: 'Pate werden und Hoffnung pflanzen.',
    followUs: 'Folge uns',
    explore: 'Entdecken',
    addressHeading: 'Adresse',
    address: [
      'Schulgasse 9',
      '74336 Brackenheim',
      'Baden-Württemberg, Deutschland',
    ],
    menuColumns: [
      [
        { to: 'home', label: 'Startseite' },
        { to: 'about', label: 'Über uns' },
        { to: 'trees', label: 'Bäume' },
        { to: 'impressions', label: 'Eindrücke' },
        { to: 'contact', label: 'Kontakt' },
      ],
      [
        { to: 'faqs', label: 'FAQs' },
        { to: 'news', label: 'News' },
        { to: 'terms', label: 'AGB' },
        { to: 'privacy', label: 'Datenschutz' },
        { to: 'impressum', label: 'Impressum' },
      ],
    ],
  },
  en: {
    tagline: 'Growing a greener tomorrow.',
    sponsor: 'Sponsor a tree and nurture hope.',
    followUs: 'Follow Us',
    explore: 'Explore',
    addressHeading: 'Address',
    address: [
      'Schulgasse 9',
      '74336 Brackenheim',
      'Baden-Württemberg, Germany',
    ],
    menuColumns: [
      [
        { to: 'home', label: 'Home' },
        { to: 'about', label: 'About' },
        { to: 'trees', label: 'Trees' },
        { to: 'impressions', label: 'Impressions' },
        { to: 'contact', label: 'Contact' },
      ],
      [
        { to: 'faqs', label: 'FAQs' },
        { to: 'news', label: 'News' },
        { to: 'terms', label: 'Terms' },
        { to: 'privacy', label: 'Privacy' },
        { to: 'impressum', label: 'Impressum' },
      ],
    ],
  },
};

export default function Upper() {
  const text = useCopy(copy);

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
              <p className='mt-3 font-sans text-lg'>{text.tagline}</p>
            </div>
            <p className='mt-3 font-sans text-lg'>{text.sponsor}</p>
            <div className='space-y-3'>
              <p className='text-lg font-bold'>{text.followUs}</p>
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
              {text.explore}
            </h3>
            <div className='flex gap-16'>
              {text.menuColumns.map(column => (
                <div key={column[0].to} className='space-y-3'>
                  {column.map(link => (
                    <MenuLink
                      key={link.to}
                      to={link.to}
                      pageName={link.label}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third Coloumn */}
        <div className='flex w-full flex-col gap-5 lg:mt-10 lg:w-1/3 lg:items-center'>
          <div className='space-y-5'>
            <h3 className='flex items-center gap-3 font-sans text-lg font-bold uppercase'>
              {text.addressHeading}
            </h3>
            <div className='flex items-start gap-3'>
              <FaLocationDot />
              <p className='-mt-1'>
                {text.address.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < text.address.length - 1 && <br />}
                  </span>
                ))}
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
