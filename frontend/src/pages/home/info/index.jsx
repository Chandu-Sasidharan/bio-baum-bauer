import { Parallax } from 'react-parallax';
import InfoItem from '@/pages/home/info/info-item';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    cards: [
      {
        title: 'News',
        description: 'Bleibe über alle Neuigkeiten und Aktivitäten informiert.',
        link: '/news',
      },
      {
        title: 'Eindrücke',
        description: 'Entdecke Eindrücke und Fotos, die unseren Hof zeigen.',
        link: '/impressions',
      },
      {
        title: 'FAQs',
        description: 'Du hast Fragen? Unsere FAQs liefern schnelle Antworten.',
        link: '/faqs',
      },
    ],
    cta: 'Mehr erfahren',
  },
  en: {
    cards: [
      {
        title: 'News',
        description:
          'Stay updated with the latest news about our business and activities.',
        link: '/news',
      },
      {
        title: 'Impressions',
        description:
          'Explore our impressions to see a collection of images showcasing our farm.',
        link: '/impressions',
      },
      {
        title: 'FAQs',
        description:
          'Have questions? Check our FAQs for answers to common inquiries.',
        link: '/faqs',
      },
    ],
    cta: 'Read More',
  },
};

export default function Info() {
  const text = useCopy(copy);

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
          {text.cards.map(card => (
            <InfoItem
              key={card.link}
              title={card.title}
              description={card.description}
              link={card.link}
              ctaLabel={text.cta}
            />
          ))}
        </div>
      </div>
    </Parallax>
  );
}
