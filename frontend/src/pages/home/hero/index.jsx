import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import logoImage from '/images/logo/bbb-logo.svg';
import { FaArrowDown } from 'react-icons/fa6';
import style from '@/pages/home/hero/hero.module.css';
import Button from '@/components/ui/button';
import treeIcon from '/images/misc/tree.png';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    title: 'Heute pflanzen für ein grüneres Morgen',
    paragraphs: [
      'Schließe dich der Green-Legacy-Initiative von Bio Baum Bauer an und übernimm eine Baumpatenschaft in Süddeutschland.',
      'Bewahre die Biodiversität, stärke das ökologische Gleichgewicht und setze ein dauerhaftes Zeichen für eine grünere Zukunft.',
    ],
    plant: 'Baum pflanzen',
    learnMore: 'Mehr erfahren',
  },
  en: {
    title: 'Plant today for a greener tomorrow',
    paragraphs: [
      "Join Bio Baum Bauer's Green Legacy initiative and sponsor a tree in Southern Germany.",
      'Help preserve biodiversity, foster ecological balance, and create a lasting impact for a greener tomorrow.',
    ],
    plant: 'Plant a Tree',
    learnMore: 'Learn More',
  },
};

export default function Hero() {
  const text = useCopy(copy);
  return (
    <section
      className={`flex flex-col items-center justify-center gap-5 ${style.hero}`}
    >
      <img
        src={logoImage}
        alt='BioBaumBauer Logo'
        className='z-[1] hidden md:h-[300px] md:w-[300px] lg:block'
      />
      <div className='z-[1] flex max-w-6xl flex-col items-center gap-5 px-5 text-center text-white'>
        <h1 className='font-chicle text-4xl tracking-wide sm:text-5xl md:text-6xl'>
          {text.title}
        </h1>
        <div className='text-lg'>
          {text.paragraphs.map(sentence => (
            <p key={sentence}>{sentence}</p>
          ))}
        </div>
        <div className='flex gap-4'>
          <Link to='/trees'>
            <Button variant='primary' className='border-none'>
              <img src={treeIcon} alt='Tree Icon' className='h-5 w-5' />
              <span>{text.plant}</span>
            </Button>
          </Link>
          <ScrollLink to='more' smooth={true} duration={100} offset={-140}>
            <Button variant='primary' className='border-none'>
              <span className='flex items-center gap-2'>
                <span>{text.learnMore}</span>
                <FaArrowDown />
              </span>
            </Button>
          </ScrollLink>
        </div>
      </div>
    </section>
  );
}
