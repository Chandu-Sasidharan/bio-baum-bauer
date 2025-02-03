import Button from '@/components/ui/button';
import styles from './featured.module.css';

export default function Card({ imageUrl, name, price, children }) {
  console.log(imageUrl);
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt='Image of a tree'
          className={styles.cardImage}
        />
      </div>
      <div className='flex flex-col gap-4 p-4'>
        <p className='mb-2 flex items-center justify-between'>
          <span className='text-accent text-xl font-semibold'>{name}</span>
          <span className='bg-mint rounded-full px-3 py-1'>{price}&nbsp;€</span>
        </p>

        <Button>{children}</Button>
      </div>
    </div>
  );
}
