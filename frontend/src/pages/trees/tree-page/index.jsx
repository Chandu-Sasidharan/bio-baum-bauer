import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa';
import Button from '@/components/ui/button';
import Breadcrumbs from '@/components/breadcrumbs';
import { CartContext } from '@/context/cart-context';
import useOneTree from '@/hooks/use-one-tree';
import backgroundImage from '/images/background/leaves-background.webp';
import treeIcon from '/images/misc/tree.png';

export default function TreePage() {
  const { id } = useParams();
  const { addTree } = useContext(CartContext);
  const { tree, isLoading, isError } = useOneTree(id);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addTree(id);
    // Redirect to the cart page
    navigate('/cart');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div className='w-full'>
      <Helmet>
        <title>About Us | Bio Baum Bauer</title>
      </Helmet>

      {/* Container */}
      <section
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className='w-full bg-cover bg-center bg-no-repeat'
      >
        <div
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          className='w-full'
        >
          {/* Breadcrumbs */}
          <div className='w-full px-5'>
            <Breadcrumbs />
          </div>

          {/* Content */}
          <div className='my-5 w-full p-5'>
            <div
              className='mx-auto flex w-full max-w-5xl flex-col gap-3 rounded-md p-5 shadow-sm'
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            >
              {/* Tree Header */}
              <div className='bg-accent flex w-full items-center justify-between rounded-sm p-3 text-white'>
                <div className='flex items-center gap-3'>
                  <img
                    src={treeIcon}
                    alt='Tree Icon'
                    style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                    }}
                  />
                  <h1 className='font-chicle text-nowrap text-3xl md:text-4xl'>
                    {tree.name}
                  </h1>
                </div>
                <div className='hidden items-center gap-3 sm:flex'>
                  <p className='bg-mint text-accent rounded-full px-3 py-1'>
                    Price:&nbsp;{tree.price.$numberDecimal}&nbsp;€
                  </p>
                  <Button onClick={handleAddToCart} size='sm'>
                    <FaCartPlus />
                    <span>Plant now</span>
                  </Button>
                </div>
              </div>

              {/* Tree Details */}
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <p>
                    <span className='text-primary-dark font-semibold'>
                      Category:
                    </span>
                    <span className='ml-2 inline-block font-semibold'>
                      {tree.category}
                    </span>
                  </p>
                  <p>
                    <span className='text-primary-dark font-semibold'>
                      Stock:
                    </span>
                    <span className='ml-2 inline-block font-semibold'>
                      {tree.availableQuantity}
                    </span>
                  </p>
                </div>
                <div className='flex w-full items-center justify-end gap-3 sm:hidden'>
                  <p className='bg-mint text-accent rounded-full px-3 py-1'>
                    Price:&nbsp;{tree.price.$numberDecimal}&nbsp;€
                  </p>
                  <Button onClick={handleAddToCart} size='sm'>
                    <FaCartPlus />
                    <span>Plant now</span>
                  </Button>
                </div>
              </div>

              {/* Tree Image */}
              <img
                className='h-full w-full rounded-sm object-cover shadow-sm'
                src={tree.imageUrl}
                alt={tree.name}
              />

              {/* Description */}
              <div className='flex w-full flex-col gap-2'>
                {/* Horizontal Line */}
                <hr className='border-primary border-t-1 mx-auto my-5 w-[70%]' />
                <div className='flex items-baseline gap-2'>
                  <img
                    src={treeIcon}
                    alt='Tree Icon'
                    className='h-[25px] w-[25px]'
                  />
                  <h3 className='text-accent font-chicle text-3xl tracking-wide'>
                    About {tree.name}
                  </h3>
                </div>
                <div
                  className='prose md:prose-lg -mt-3 max-w-none'
                  dangerouslySetInnerHTML={{
                    __html: tree.description,
                  }}
                />
              </div>

              {/* Add to Cart Function */}
              <Button
                variant='primary'
                rounded={true}
                className='w-full'
                onClick={handleAddToCart}
              >
                <FaCartPlus />
                <span>Plant this tree now</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
