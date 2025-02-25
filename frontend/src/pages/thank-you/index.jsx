import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '@/components/breadcrumbs';
import backgroundImage from '/images/background/leaves-background.webp';
import { useCart } from '@/context/cart-context';

export default function ThankYou() {
  const { clearCartTrees } = useCart();
  const hasClearedCart = useRef(false);

  // Clear cartItems on Thank You page load
  useEffect(() => {
    if (!hasClearedCart.current) {
      clearCartTrees();
      hasClearedCart.current = true;
    }
  }, [clearCartTrees]);

  return (
    <>
      <Helmet>
        <title>Thank You | Bio Baum Bauer</title>
      </Helmet>

      {/* Container */}
      <section
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className='bg-cover bg-center bg-no-repeat'
      >
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          {/* Breadcrumbs */}
          <div className='px-5'>
            <Breadcrumbs />
          </div>

          {/* Content */}
          <div className='p-2 sm:my-5 lg:p-5'>
            <div
              className='mx-auto flex max-w-5xl flex-col rounded-md p-5 shadow-sm sm:p-10 lg:p-14'
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                minHeight: '50vh',
              }}
            >
              <p>Thank you for Sponsoring!</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
