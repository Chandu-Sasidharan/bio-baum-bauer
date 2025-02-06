import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { RiSecurePaymentFill } from 'react-icons/ri';
import Button from '@/components/ui/button';
import Spinner from '@/components/spinner';
import Breadcrumbs from '@/components/breadcrumbs';
import backgroundImage from '/images/background/leaves-background.webp';
import treeIcon from '/images/misc/tree.png';
import { useCart } from '@/context/cart-context';
import { useUser } from '@/context/auth-context';

export default function Checkout() {
  const { calculatePrice, getTotalTreeCount, isCartLoading } = useCart();
  const { user } = useUser();
  const [email, setEmail] = useState(user ? user.email : '');
  const [isGuest, setIsGuest] = useState(false);
  const navigate = useNavigate();

  const { totalPrice, totalTax, grandTotal } = calculatePrice();
  const totalTreeCount = getTotalTreeCount();

  if (isCartLoading) {
    return <Spinner />;
  }

  const handleCheckboxChange = e => {
    setIsGuest(e.target.checked);
  };

  const handleCheckout = async () => {
    // Validate email if guest checkout
    if (isGuest && !email) {
      alert('Please enter your email for checkout.');
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems,
          email,
          isGuest,
        }),
      });
      const data = await response.json();

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout | Bio Baum Bauer</title>
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
              className='mx-auto flex max-w-7xl flex-col rounded-md p-5 shadow-sm sm:p-10 lg:p-14'
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                minHeight: '50vh',
              }}
            >
              {/* Checkout Header */}
              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <div className='flex items-center gap-2'>
                    <PiShoppingCartSimpleFill className='text-2xl md:text-3xl' />
                    <h1 className='font-chicle text-2xl tracking-wide md:text-3xl'>
                      Sponsorship Summary
                    </h1>
                  </div>
                </div>
                <Link to='/cart' className='hidden lg:block'>
                  <Button className='uppercase' variant='primary' size='sm'>
                    <span>
                      <PiShoppingCartSimpleFill className='text-lg' />
                    </span>
                    <span>Go Back to My Cart</span>
                  </Button>
                </Link>
              </div>

              <div className='mt-3 flex flex-col gap-5 lg:flex-row lg:gap-10'>
                {/* Checkout Form */}
                <div className='flex flex-col gap-3 lg:w-1/2'>
                  {!user && (
                    <div className='space-y-3'>
                      <p className='text-stone'>
                        Please log in or sign up to access a personalized
                        dashboard where you can view your order details and
                        receive updates.
                      </p>
                      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-10'>
                        <Link to='/login'>
                          <Button
                            className=''
                            variant='primary'
                            rounded={true}
                            size='sm'
                          >
                            <span>Log In / Sign Up</span>
                          </Button>
                        </Link>
                        {/* Continue as a guest */}
                        <label htmlFor='checkbox' className='flex items-center'>
                          <input
                            type='checkbox'
                            className='checkbox checkbox-sm'
                            onChange={handleCheckboxChange}
                          />
                          <span className='ml-2'>Continue as a guest</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Guest Checkout */}
                  {isGuest && (
                    <div>
                      {/* Name */}
                      <label htmlFor='name' className='text-stone'>
                        Name
                      </label>
                      <input
                        type='text'
                        id='name'
                        className='input input-bordered w-full pl-10'
                      />
                      {/* Email */}
                      <label htmlFor='email' className='text-stone'>
                        Email
                      </label>
                      <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='input input-bordered w-full pl-10'
                      />
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className='flex flex-col gap-5 lg:w-1/2'>
                  <div className='bg-primary-light flex flex-col gap-2 rounded-sm p-3'>
                    <p className='flex justify-between'>
                      <span className='text-lg'>Total Price:</span>
                      <span className='text-lg'>€ {totalPrice}</span>
                    </p>
                    <p className='flex justify-between'>
                      <span className='text-lg'>Tax:</span>
                      <span className='text-lg'>€ {totalTax}</span>
                    </p>
                    <hr className='border-primary border-t-1 mx-auto my-2 w-[70%]' />
                    <p className='flex justify-between text-nowrap'>
                      <span className='text-lg'>Grand Total:</span>
                      <span className='text-lg'>€ {grandTotal}</span>
                    </p>
                  </div>
                  <Link to='/checkout' className='mt-5'>
                    <Button
                      className='w-full uppercase'
                      onClick={handleCheckout}
                    >
                      <p className='flex items-center justify-center gap-1'>
                        <RiSecurePaymentFill className='text-lg' />
                        <span>Proceed to Payment</span>
                      </p>
                    </Button>
                  </Link>
                  <Link to='/trees'>
                    <Button className='w-full' variant='primary' rounded={true}>
                      <div className='flex items-center justify-center gap-1'>
                        <img
                          src={treeIcon}
                          alt='Tree Icon'
                          className='h-[16px] w-[16px]'
                        />
                        <span className='text-nowrap'>Add More Trees</span>
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
