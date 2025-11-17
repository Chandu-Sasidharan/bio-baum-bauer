import { Link } from 'react-router-dom';
import Button from '@/components/ui/button';
import { FaArrowRightLong } from 'react-icons/fa6';
import visionImage from '/images/more/vision.webp';
import treeIcon from '/images/misc/tree.png';
import styles from './more.module.css';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    kicker: 'Unsere Vision',
    titleLineOne: 'Ein grüneres Morgen,',
    titleLineTwo: 'Baum für Baum',
    body: 'Wir sehen eine Welt, in der Menschen im Einklang mit der Natur leben. Durch nachhaltige Methoden, Bildung und aktive Beteiligung in der Gemeinschaft schaffen wir ein Vermächtnis aus ökologischem Gleichgewicht und sozialer Verantwortung für alle Generationen.',
    learnMore: 'Mehr erfahren',
    overlayCta: 'Baum pflanzen',
  },
  en: {
    kicker: 'Our Vision',
    titleLineOne: 'A Greener Tomorrow,',
    titleLineTwo: 'One Tree at a Time',
    body: 'We envision a world where humanity thrives in harmony with nature. Through sustainable practices, education, and active community engagement, we aim to cultivate a legacy of ecological balance and social empowerment, ensuring a vibrant and sustainable future for all.',
    learnMore: 'Learn More',
    overlayCta: 'Plant a Tree',
  },
};

export default function Mission() {
  const text = useCopy(copy);
  return (
    <div className='mx-auto my-7 flex max-w-7xl flex-col items-center justify-center gap-10 p-5 md:my-20 md:flex-row md:gap-16'>
      <article className='text-stone flex w-full flex-col items-start justify-center gap-3 md:w-1/2'>
        <h2 className='text-sage text-2xl tracking-wider'>{text.kicker}</h2>
        <h3 className='text-accent text-3xl font-semibold'>
          {text.titleLineOne}
          <br />
          {text.titleLineTwo}
        </h3>
        <p className='text-lg'>{text.body}</p>
        <Link to='/trees' className='mt-2'>
          <Button variant='primary' rounded={true}>
            <span className='flex items-center gap-2'>
              <span>{text.learnMore}</span>
              <FaArrowRightLong className='transition-transform duration-300' />
            </span>
          </Button>
        </Link>
      </article>
      <div
        className={`relative w-full md:h-96 md:w-1/2 ${styles.imageContainer}`}
      >
        <img
          src={visionImage}
          alt='Vision Image'
          className={`${styles.image}`}
        />
        <div
          className={`${styles.overlay} flex flex-col items-center justify-center`}
        >
          {/* Overlay Button */}
          <Link to='/trees'>
            <Button variant='primary' rounded={true}>
              <span className='flex items-center gap-2'>
                <img src={treeIcon} alt='Tree Icon' className='h-5 w-5' />
                <span>{text.overlayCta}</span>
                <FaArrowRightLong className='transition-transform duration-300' />
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
