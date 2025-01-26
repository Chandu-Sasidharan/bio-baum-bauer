import { Link } from 'react-router-dom';
import Button from '@/components/elements/button';
import styles from './card.module.css';

export default function Card({ image, name, price, id }) {
  return (
    <Link
      to={`/tree/${id}`}
      className={`${styles.card} max-w-[270px] overflow-hidden rounded-md bg-white shadow-md`}
    >
      <div className={`${styles.imageWrapper}`}>
        <img src={image} alt='Image of a tree' className={`${styles.image}`} />
      </div>
      <div className='flex flex-col gap-4 p-4'>
        <p className='mb-2 flex items-center justify-between'>
          <span className='text-accent text-xl font-semibold'>{name}</span>
          <span className='bg-mint rounded-full px-3 py-1'>{price}&nbsp;€</span>
        </p>
        <Button>Learn More</Button>
      </div>
    </Link>
  );
}
