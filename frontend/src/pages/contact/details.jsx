import { MdEmail } from 'react-icons/md';
import { BsTwitterX } from 'react-icons/bs';
import treeIcon from '/images/misc/tree.png';
import { FaYoutube, FaLocationDot } from 'react-icons/fa6';
import { FaLinkedin, FaSquarePhone } from 'react-icons/fa6';
import SocialLink from '@/components/ui/social-link';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    heading: 'Kontakt',
    address: ['Schulgasse 9', '74336 Brackenheim', 'Baden-Württemberg, Deutschland'],
    phone: '+49 1234567890',
    follow: 'Folge uns',
  },
  en: {
    heading: 'Get in touch',
    address: ['Schulgasse 9', '74336 Brackenheim', 'Baden-Württemberg, Germany'],
    phone: '+49 1234567890',
    follow: 'Follow Us',
  },
};

export default function Details() {
  const text = useCopy(copy);
  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='-ml-1 mb-3 flex items-center gap-3'>
        <img src={treeIcon} alt='Tree Icon' className='h-[40px] w-[40px]' />
        <h1 className='text-accent font-chicle border-primary border-b-2 text-4xl tracking-wider uppercase'>
          {text.heading}
        </h1>
      </div>
      <div className='flex items-start gap-3 text-lg'>
        <span className='mt-1'>
          <FaLocationDot />
        </span>
        <p className='flex flex-col gap-1'>
          {text.address.map(line => (
            <span key={line}>{line}</span>
          ))}
        </p>
      </div>
      <div className='flex items-center gap-3 text-lg'>
        <FaSquarePhone />
        <span>{text.phone}</span>
      </div>
      <div className='flex items-center gap-3'>
        <MdEmail />
        <span className='text-sm sm:text-lg'>
          <a
            href='mailto:hello@biobaumbauer.de'
            target='_blank'
            rel='noopener noreferrer'
          >
            hello@biobaumbauer.de
          </a>
        </span>
      </div>

      <div className='space-y-3'>
        <p className='font-chicle mt-5 text-xl font-bold tracking-widest md:mt-10'>
          {text.follow}
        </p>
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
  );
}
