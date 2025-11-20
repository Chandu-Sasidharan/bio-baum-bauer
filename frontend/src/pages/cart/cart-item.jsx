import { Link } from 'react-router-dom';
import { LuPlus, LuMinus } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import Button from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    quantity: 'Menge',
    price: 'Preis',
    each: 'pro Stück',
  },
  en: {
    quantity: 'Quantity',
    price: 'Price',
    each: 'each',
  },
};

export default function CartItem({ tree }) {
  const {
    removeTreeFromCart,
    getTreeCount,
    incrementTreeCount,
    decrementTreeCount,
  } = useCart();
  const treeCount = getTreeCount(tree._id);
  const text = useCopy(copy);

  return (
    <div className='bg-primary-light relative flex w-full flex-col justify-between gap-2 rounded-sm p-4 lg:flex-row lg:items-end lg:p-6'>
      {/* Tree Image and Name */}
      <Link
        to={`/trees/${tree._id}`}
        className='flex flex-col gap-1 lg:flex-col-reverse'
      >
        <img
          src={tree.imageUrl}
          alt={tree.name}
          className='rounded-sm object-cover lg:h-[200px] lg:w-[300px]'
        />
        <p className='font-chicle text-xl tracking-wider'>{tree.name}</p>
      </Link>

      <div className='flex flex-col gap-3'>
        {/* Tree Qty */}
        <div className='flex items-center justify-between gap-3'>
          <span className='text-lg font-semibold'>{text.quantity}</span>
          <div className='flex items-center'>
            <Button
              onClick={() => decrementTreeCount(tree._id)}
              variant='primary'
              size='xs'
              className='bg-transparent'
            >
              <LuMinus />
            </Button>
            <span className='mx-3 text-lg font-semibold'>{treeCount}</span>
            <Button
              onClick={() => incrementTreeCount(tree._id)}
              variant='primary'
              size='xs'
              className='bg-transparent'
            >
              <LuPlus />
            </Button>
          </div>
        </div>
        {/* Tree Price */}
        <div className='flex items-center justify-between gap-3'>
          <span>{text.price}</span>
          <span>
            <span className='mr-1 inline-block'>€</span>
            <span>{tree.price.$numberDecimal}</span>
            <span className='ml-1 inline-block'>{text.each}</span>
          </span>
        </div>
      </div>

      {/* Remove Tree */}
      <Button
        onClick={() => removeTreeFromCart(tree._id)}
        variant='primary'
        size='sm'
        className='absolute right-5 top-5 w-fit bg-white px-2 shadow-sm'
      >
        <MdDelete className='text-red text-lg' />
      </Button>
    </div>
  );
}
