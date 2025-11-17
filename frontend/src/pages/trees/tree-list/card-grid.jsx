import { Link } from 'react-router-dom';
import Card from './card';
import styles from './trees.module.css';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    button: 'In den Warenkorb',
  },
  en: {
    button: 'Add To Cart',
  },
};

export default function CardGrid({ trees }) {
  const text = useCopy(copy);

  return (
    <div className={styles.gridContainer}>
      {trees.map(tree => (
        <Link to={`/trees/${tree._id}`} key={tree._id}>
          <Card
            imageUrl={tree.imageUrl}
            name={tree.name}
            price={tree.price.$numberDecimal}
          >
            {text.button}
          </Card>
        </Link>
      ))}
    </div>
  );
}
