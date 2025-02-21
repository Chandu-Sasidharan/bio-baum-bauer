import { Link } from 'react-router-dom';
import Card from './card';
import styles from './trees.module.css';

export default function CardGrid({ trees }) {
  return (
    <div className={styles.gridContainer}>
      {trees.map(tree => (
        <Link to={`/trees/${tree._id}`} key={tree._id}>
          <Card
            imageUrl={tree.imageUrl}
            name={tree.name}
            price={tree.price.$numberDecimal}
          >
            Add To Cart
          </Card>
        </Link>
      ))}
    </div>
  );
}
