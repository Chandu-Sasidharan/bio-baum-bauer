import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import { RiSecurePaymentFill } from 'react-icons/ri';
import Button from '@/components/ui/button';
import Spinner from '@/components/spinner';
import Breadcrumbs from '@/components/breadcrumbs';
import backgroundImage from '/images/background/leaves-background.webp';
import treeIcon from '/images/misc/tree.png';
import { useCart } from '@/context/cart-context';
import { useUser } from '@/context/auth-context';

// Define schema with zod
const schema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  name: z.string().min(2, { message: 'Please enter your name.' }),
  isGuest: z.boolean(),
});

export default function Checkout() {
  const { calculatePrice, isCartLoading } = useCart();
  const { totalPrice, totalTax, grandTotal } = calculatePrice();
  const { authUser, isAuthenticated } = useUser();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: authUser ? authUser.email : '',
      isGuest: false,
      name: '',
    },
  });

  const isGuest = watch('isGuest');

  if (isCartLoading) {
    return <Spinner />;
  }

  const onSubmit = async formData => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems,
          email: formData.email,
          isGuest: formData.isGuest,
        }),
      });
      const responseData = await response.json();

      // Redirect to Stripe Checkout
      window.location.href = responseData.url;
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
                {/* Checkout Form / Left side */}
                <div className='flex flex-col gap-3 lg:w-1/2'>
                  <p className='text-primary-dark text-sm'>
                    Sponsor these trees to help combat climate change and
                    support reforestation efforts.
                  </p>
                  {!isAuthenticated && (
                    <div className='bg-primary-light space-y-3 rounded-sm p-3'>
                      <p className='text-stone'>
                        Please log in or sign up to access a personalized
                        dashboard.
                      </p>
                      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-10'>
                        <Link to='/login' state={{ from: location }}>
                          <Button
                            className=''
                            variant='primary'
                            rounded={true}
                            size='sm'
                            disabled={isGuest}
                          >
                            <span>Log In / Sign Up</span>
                          </Button>
                        </Link>
                        {/* Continue as a guest */}
                        <label htmlFor='checkbox' className='flex items-center'>
                          <input
                            type='checkbox'
                            className='checkbox checkbox-sm'
                            {...register('isGuest')}
                          />
                          <span className='ml-2'>Continue as a guest</span>
                        </label>
                      </div>
                    </div>
                  )}

                  <hr className='border-primary border-t-1 mx-auto mb-2 mt-3 w-[70%]' />

                  {/* Billing Details */}
                  <div className='flex flex-col gap-1'>
                    <h2 className='text-stone text-lg font-semibold'>
                      Billing Adress
                    </h2>
                    {/* Name */}

                    <div>
                      <label htmlFor='name' className='text-stone ml-1 text-sm'>
                        Your Name
                      </label>
                      <input
                        type='text'
                        placeholder='Please enter your name'
                        {...register('name')}
                        className={`input input-bordered input-light w-full pl-3 focus:outline-none ${
                          errors.name
                            ? 'border-red focus:border-red'
                            : 'focus:border-primary'
                        }`}
                      />
                      <div className='mt-[2px] h-4'>
                        {errors.name && (
                          <p className='text-red text-sm'>
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor='email'
                        className='text-stone ml-1 text-sm'
                      >
                        Your Email
                      </label>
                      <input
                        type='email'
                        placeholder='Plese enter your email'
                        {...register('email')}
                        className={`input input-bordered input-light w-full pl-3 focus:outline-none ${
                          errors.email
                            ? 'border-red focus:border-red'
                            : 'focus:border-primary'
                        }`}
                      />
                      <div className='mt-[2px] h-4'>
                        {errors.email && (
                          <p className='text-red text-sm'>
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary / Right side */}
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
                  <Button
                    className='w-full uppercase'
                    onClick={handleSubmit(onSubmit)}
                    disabled={!isAuthenticated && !isGuest}
                  >
                    <p className='flex items-center justify-center gap-1'>
                      <RiSecurePaymentFill className='text-lg' />
                      <span>Proceed to Payment</span>
                    </p>
                  </Button>
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
