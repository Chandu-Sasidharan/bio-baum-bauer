import { Parallax } from 'react-parallax';
import InfoItem from '@/pages/home/info/info-item';

export default function Info() {
  return (
    <Parallax
      blur={1}
      bgImage='/images/info/farm.webp'
      bgImageAlt='Image of the farm.'
      strength={300}
    >
      <div
        className='w-full px-5 py-10 md:py-20 lg:py-36'
        style={{ backgroundColor: 'rgba(36, 49, 35, 0.5)' }}
      >
        <div className='mx-auto flex max-w-7xl flex-col items-center gap-5 md:flex-row md:items-start md:gap-10'>
          <InfoItem
            title='News'
            description='Stay updated with the latest news about our business and activities.'
            link='/news'
          />
          <InfoItem
            title='Impressions'
            description='Explore our impressions to see a collection of images showcasing our farm.'
            link='/impressions'
          />
          <InfoItem
            title='FAQs'
            description='Have questions? Check our FAQs for answers to common inquiries.'
            link='/faqs'
          />
        </div>
      </div>
    </Parallax>
  );
}
