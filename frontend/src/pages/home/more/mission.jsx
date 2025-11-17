import { Link } from 'react-router-dom';
import Button from '@/components/ui/button';
import { FaArrowRightLong } from 'react-icons/fa6';
import missionImage from '/images/more/mission.jpeg';
import treeIcon from '/images/misc/tree.png';
import styles from './more.module.css';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    kicker: 'Unsere Mission',
    titleLineOne: 'Wachstum fördern,',
    titleLineTwo: 'Nachhaltigkeit stärken',
    body: 'Im Herzen unserer Mission steht das Ziel, Menschen durch transformative Initiativen wieder mit der Natur zu verbinden. Durch das Pflanzen und Pflegen von Bäumen bekämpfen wir den Klimawandel, fördern die Biodiversität und stärken das Umweltbewusstsein. Wir laden Gemeinschaften dazu ein, gemeinsam eine gesunde, grüne Zukunft zu schaffen – jeder Baum, jede helfende Hand und jede gute Tat trägt zu einer lebenswerteren Welt bei.',
    learnMore: 'Mehr erfahren',
    overlayCta: 'Baum pflanzen',
  },
  en: {
    kicker: 'Our Mission',
    titleLineOne: 'Empowering Growth,',
    titleLineTwo: 'Nurturing Sustainability',
    body: 'At the core of our mission is a commitment to reconnect people with nature through transformative initiatives. By planting and nurturing trees, we combat climate change, enhance biodiversity, and foster environmental stewardship. Our goal is to inspire communities to join hands in creating a healthier, greener planet for future generations. It is a collective journey - one where every tree, every volunteer, and every act of kindness contributes to a more vibrant and sustainable future.',
    learnMore: 'Learn More',
    overlayCta: 'Plant a Tree',
  },
};

export default function Mission() {
  const text = useCopy(copy);
  return (
    <div className='mx-auto my-7 flex max-w-7xl flex-col items-center justify-center gap-10 p-5 md:my-20 md:flex-row-reverse md:gap-16'>
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
          src={missionImage}
          alt='Mission Image'
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
