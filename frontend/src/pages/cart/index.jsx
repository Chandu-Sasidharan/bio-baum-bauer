import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import Button from '@/components/ui/button';
import Spinner from '@/components/spinner';
import Breadcrumbs from '@/components/breadcrumbs';
import backgroundImage from '/images/background/leaves-background.webp';
import treeIcon from '/images/misc/tree.png';
import { useCart } from '@/context/cart-context';
import { useUser } from '@/context/auth-context';
import CartItem from './cart-item';
import usePaymentIntent from '@/hooks/use-payment-intent';
import showAlert from '@/utils/alert';
import { TAX_RATE, CURRENCY } from '@/utils/constants';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    metaTitle: 'Warenkorb | Bio Baum Bauer',
    header: 'Dein Warenkorb',
    subheader:
      'Schließe den Kauf ab, um diese Bäume zu unterstützen und aktiv zur Aufforstung beizutragen.',
    checkout: 'Zur Kasse',
    totals: {
      totalPrice: 'Zwischensumme:',
      tax: 'Steuer:',
      grand: 'Gesamtsumme:',
    },
    guestPrompt:
      'Bitte melde dich an oder registriere dich, um dein persönliches Dashboard zu sehen.',
    login: 'Anmelden / Registrieren',
    continueAsGuest: 'Als Gast fortfahren',
    addMore: 'Weitere Bäume hinzufügen',
    empty: 'Dein Warenkorb ist leer.',
    addTrees: 'Bäume hinzufügen',
    alertTitle: 'Checkout fehlgeschlagen',
    alertFallback: 'Etwas ist schiefgelaufen!',
  },
  en: {
    metaTitle: 'Cart | Bio Baum Bauer',
    header: 'Your Cart',
    subheader:
      'Checkout to sponsor these trees to help combat climate change and support reforestation efforts.',
    checkout: 'Checkout',
    totals: {
      totalPrice: 'Total Price:',
      tax: 'Tax:',
      grand: 'Grand Total:',
    },
    guestPrompt:
      'Please log in or sign up to access a personalized dashboard.',
    login: 'Log In / Sign Up',
    continueAsGuest: 'Continue as a guest',
    addMore: 'Add More Trees',
    empty: 'Your cart is empty.',
    addTrees: 'Add Trees',
    alertTitle: 'Checkout Failed',
    alertFallback: 'Something went wrong!',
  },
};

export default function Cart() {
  const { authUser, isAuthenticated } = useUser();
  const [isGuest, setIsGuest] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    cartItems,
    cartTrees,
    calculatePrice,
    getTotalTreeCount,
    isCartLoading,
  } = useCart();
  const { totalPrice, totalTax, grandTotal } = calculatePrice();
  const totalTreeCount = getTotalTreeCount();
  const text = useCopy(copy);
  // Initialize the payment intent hook mutation
  const { getPaymentIntent, isPaymentLoading } = usePaymentIntent();

  const handleSubmit = () => {
    const paymentData = {
      currency: CURRENCY,
      taxRate: TAX_RATE,
      cartItems,
      isGuest,
      ...(authUser && { email: authUser.email }),
      ...(authUser?.firstName && { firstName: authUser.firstName }),
      ...(authUser && { userId: authUser.id }),
    };
    getPaymentIntent(paymentData, {
      onSuccess: data => {
        // Navigate to the payment form page and pass the client secret in state
        navigate('/checkout', {
          state: { paymentIntent: data.paymentIntent },
        });
      },
      onError: error => {
        showAlert(
          'error',
          text.alertTitle,
          error.response.data.message || text.alertFallback
        );
      },
    });
  };

  if (isCartLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>{text.metaTitle}</title>
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
          <div className='p-2 sm:py-10 lg:px-5'>
            <div
              className='mx-auto flex max-w-[500px] flex-col rounded-md p-5 shadow-sm sm:p-10 lg:w-full lg:max-w-7xl lg:p-14'
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                minHeight: '50vh',
              }}
            >
              {/* Cart Header */}
              <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                  <div className='flex items-center gap-2'>
                    <PiShoppingCartSimpleFill className='text-2xl md:text-3xl' />
                    <h1 className='font-chicle text-2xl tracking-wide md:text-3xl'>
                      {text.header}
                    </h1>
                  </div>
                  <p className='text-primary-dark text-sm'>
                    {text.subheader}
                  </p>
                </div>
                <Button
                  className='hidden uppercase lg:block'
                  disabled={!totalTreeCount || (!isAuthenticated && !isGuest)}
                  onClick={handleSubmit}
                  isProcessing={isPaymentLoading}
                >
                  <PiShoppingCartSimpleFill className='mr-1 inline-block text-lg' />
                  <span>{text.checkout}</span>
                </Button>
              </div>

              {/* Cart Details */}
              <div className='mt-3 flex flex-col gap-4 lg:flex-row'>
                {/* Left Side */}
                <div className='mt-3 flex w-[100%] flex-col gap-5 lg:w-[50%]'>
                  <div className='bg-primary-light flex flex-col gap-2 rounded-sm p-3'>
                    <p className='flex justify-between'>
                      <span className='text-lg'>{text.totals.totalPrice}</span>
                      <span className='text-lg'>€ {totalPrice}</span>
                    </p>
                    <p className='flex justify-between'>
                      <span className='text-lg'>{text.totals.tax}</span>
                      <span className='text-lg'>€ {totalTax}</span>
                    </p>
                    <hr className='border-primary border-t-1 mx-auto my-2 w-[70%]' />
                    <p className='flex justify-between text-nowrap'>
                      <span className='text-lg'>{text.totals.grand}</span>
                      <span className='text-lg'>€ {grandTotal}</span>
                    </p>
                  </div>

                  {!isAuthenticated && (
                    <div className='bg-primary-light space-y-3 rounded-sm p-3'>
                      <p className='text-stone'>{text.guestPrompt}</p>
                      <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-10'>
                        <Link to='/login' state={{ from: location }}>
                          <Button
                            className=''
                            variant='primary'
                            rounded={true}
                            size='sm'
                            disabled={isGuest}
                          >
                            <span>{text.login}</span>
                          </Button>
                        </Link>
                        {/* Continue as a guest */}
                        <label htmlFor='checkbox' className='flex items-center'>
                          <input
                            type='checkbox'
                            className='checkbox checkbox-sm'
                            onChange={() => setIsGuest(!isGuest)}
                            checked={isGuest}
                          />
                          <span className='ml-2'>{text.continueAsGuest}</span>
                        </label>
                      </div>
                    </div>
                  )}

                  <Button
                    className='w-full uppercase'
                    disabled={!totalTreeCount || (!isAuthenticated && !isGuest)}
                    onClick={handleSubmit}
                    isProcessing={isPaymentLoading}
                  >
                    <PiShoppingCartSimpleFill className='mr-1 inline-block text-lg' />
                    <span>{text.checkout}</span>
                  </Button>

                  {!!totalTreeCount && (
                    <Link to='/trees'>
                      <Button
                        className='w-full'
                        variant='primary'
                        rounded={true}
                      >
                        <div className='flex items-center justify-center gap-1'>
                          <img
                            src={treeIcon}
                            alt='Tree Icon'
                            className='h-[16px] w-[16px]'
                          />
                          <span className='text-nowrap'>{text.addMore}</span>
                        </div>
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Right Side */}
                {!!totalTreeCount && (
                  <div className='mt-3 flex w-full flex-col items-center gap-3 lg:w-[50%]'>
                    {cartTrees.map(tree => (
                      <CartItem key={tree._id} tree={tree} />
                    ))}
                  </div>
                )}

                {/* Empty Cart Message */}
                {!totalTreeCount && (
                  <div className='lg-mt-0 mx-auto mt-5 flex flex-col items-center justify-center gap-5'>
                    <div className='flex items-baseline gap-3'>
                      <img
                        src={treeIcon}
                        alt='Tree Icon'
                        className='h-[25px] w-[25px]'
                      />
                      <h2 className='font-chicle text-2xl tracking-wide md:text-3xl'>
                        {text.empty}
                      </h2>
                    </div>
                    <Link to='/trees'>
                      <Button
                        className='uppercase'
                        variant='primary'
                        rounded={true}
                      >
                        <PiShoppingCartSimpleFill className='text-lg' />
                        <span>{text.addTrees}</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
