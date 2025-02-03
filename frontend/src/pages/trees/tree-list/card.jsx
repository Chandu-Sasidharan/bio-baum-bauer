import Button from '@/components/elements/button';
import styles from './trees.module.css';

export default function Card({ imageUrl, name, price, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt='Image of a tree'
          className={styles.cardImage}
        />
      </div>
      <div className='flex flex-col items-start gap-2 p-4'>
        <p className='text-accent text-nowrap text-xl font-semibold'>{name}</p>
        <p className='bg-mint rounded-full px-3 py-1'>{price}&nbsp;€</p>

        <Button className='mt-1 w-full'>{children}</Button>
      </div>
    </div>
  );
}
