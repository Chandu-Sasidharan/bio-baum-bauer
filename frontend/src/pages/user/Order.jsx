import { useContext } from 'react';
import backgroundImage from '../../assets/images/leaves_background_01.webp';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { CartContext } from '@/context/cart-context';
import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { MdLabelImportant } from 'react-icons/md';
import axios from '@/utils/axios';
import { loadStripe } from '@stripe/stripe-js';
import { AuthContext } from '@/context/auth-context';
import { usePatronContext } from '@/context/PatronContext';
import { BiSolidUserDetail } from 'react-icons/bi';
import treeIcon from '../../assets/tree.png';
import { FaAmazonPay } from 'react-icons/fa';
import SponsorList from './SponsorList';

const Order = () => {
  document.title = 'Order';
  const {
    cartProducts,
    getTreeQuantity,
    TAX_RATE,
    getItemTotalPrice,
    calculateTotalPrice,
    calculateGrandTotal,
    getSelectedDataFromCart,
  } = useContext(CartContext);
  const { handleStripeSession, handleOrderGrandPrice, handleOrder } =
    useContext(AuthContext);

  const { newPatron } = usePatronContext();

  const paymentProcess = async () => {
    const stripe = await loadStripe(
      'pk_test_51OJNzPEghw7w3GNSeOkjDgkOcM1DtxgH4n9RgFspfvlxDzomukHCfqCenHxoIFFrQ0MtAvBRYMiIjtGQUYUwM7Ax00xIiee67Q'
    );
    const totalPrice = calculateGrandTotal().toFixed(2);
    const treesInCart = getSelectedDataFromCart();
    const trees = {
      cart: treesInCart,
    };
    axios
      .post('/api/payment/checkout', trees)
      .then(response => {
        const session = response.data;
        const result = stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.error(result.error);
        }
        handleStripeSession({ type: 'UPDATE_SESSION', sessionId: session.id });
        handleOrderGrandPrice({ type: 'CALC_GRAND_PRICE', total: totalPrice });
        handleOrder({ type: 'ADD_ITEMS', items: trees });
      })
      .catch(error => {
        console.log('ERROR: ', error);
      });
  };

  // Check if newPatron is defined
  if (!newPatron) {
    // Handle the case where newPatron is not available
    return <div>No patron data found.</div>;
  }

  return (
    <div>
      {cartProducts && (
        <div className='mb-0 mt-0'>
          <Breadcrumb
            aria-label='This is Breadcrumb showing the location of current page'
            className='bg-gray-50 px-5 py-3 dark:bg-gray-800'
          >
            <Breadcrumb.Item href='/' icon={HiHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href='/cart'>Cart</Breadcrumb.Item>
            <Breadcrumb.Item href='/checkout'>Checkout</Breadcrumb.Item>
            <Breadcrumb.Item>Complete Sponsorship</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      )}
      <div className='cart-page-container bg-gray-light text-stone relative mx-auto flex w-full items-center justify-center p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px]'>
        {/* Overlay with background image and opacity */}
        <div
          className='cart-page-bg absolute left-0 top-0 hidden h-full w-full bg-contain bg-top bg-no-repeat lg:block'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.2 }}
        ></div>

        <div className='rounded-base w-full rounded-md bg-white p-3 shadow-lg lg:mt-[100px] lg:p-8 xl:mt-[120px] xl:w-[90%] 2xl:w-[80%]'>
          {/* Sponsor Cart */}
          <div className='flex flex-col-reverse items-start justify-start gap-[2rem] md:gap-[1rem] lg:flex-row'>
            {/* Tree Image with Name, Qty, Price, Remove Tree Button */}
            {cartProducts.length > 0 ? (
              <div className='flex w-full flex-col items-start justify-start rounded-md bg-white p-4 sm:gap-[2rem] lg:w-[60%]'>
                {' '}
                <div className='text-gray-dark flex flex-col'>
                  <div className='mb-4 flex items-center gap-2'>
                    <BiSolidUserDetail size='2.1rem' />
                    <h3 className='text-accent font-chicle border-primary inline-block border-b-2 text-3xl tracking-wide'>
                      Patron Details
                    </h3>
                  </div>{' '}
                  <div className='flex flex-col'>
                    {' '}
                    <p className='text-gray-dark'>
                      <span className='text-gray-dark text-lg font-semibold'>
                        Full Name:
                      </span>
                      <span>
                        &nbsp;&nbsp;{newPatron.firstName}&nbsp;
                        {newPatron.lastName}
                      </span>
                    </p>
                    <p className='text-gray-dark'>
                      <span className='text-gray-dark text-lg font-semibold'>
                        Email:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.email}</span>
                    </p>
                    <p className='text-gray-dark'>
                      <span className='text-gray-dark text-lg font-semibold'>
                        Mobile Phone:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.mobilePhone}</span>
                    </p>
                    {/* Display address details */}
                    <p className='text-gray-dark'>
                      <span className='text-gray-dark text-lg font-semibold'>
                        Address Line 1:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.address.address1}</span>
                    </p>
                    <p className='text-gray-dark'>
                      <span className='text-gray-dark text-lg font-semibold'>
                        Additional Address Details:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.address.address2}</span>
                    </p>
                    <p className='text-gray-dark'>
                      <span className='text-gray-dark text-lg font-semibold'>
                        City:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.address.city}</span>
                    </p>
                    <p className='text-gray-dark'>
                      <span className='text-gray-dark text-lg font-semibold'>
                        Postcode:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.address.zipCode}</span>
                    </p>
                    <p className='text-gray-dark'>
                      <span className='text-gray-dark text-lg font-semibold'>
                        State/Country:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.address.state}</span>
                    </p>
                    <p className='text-gray-dark'>
                      <span className='text-gray-dark text-lg font-semibold'>
                        Country:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.address.country}</span>
                    </p>
                  </div>
                </div>
                {/* Horizontal Line */}
                <hr className='border-primary mx-auto my-2 w-[100%] border-t-2' />
                <SponsorList
                  cartProducts={cartProducts}
                  getTreeQuantity={getTreeQuantity}
                  getItemTotalPrice={getItemTotalPrice}
                />
              </div>
            ) : (
              <p>Your cart is empty</p>
            )}

            {/* Payment Information */}
            <div className='w-full lg:w-2/5'>
              <div className='lg:border-aloe bg-gray-light flex flex-col gap-[0.4rem] rounded-md px-3 py-4 lg:border-l-4'>
                {/* Total Price */}
                <div className='flex flex-col'>
                  <div className='flex flex-row justify-between'>
                    <div className='felx font-chicle text-accent text-xl tracking-wide'>
                      Total Price:
                    </div>
                    <div className='text-md text-gray-dark flex'>
                      € {calculateTotalPrice().toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Tax */}
                <div className='flex flex-col'>
                  <div className='flex flex-row justify-between'>
                    <div className='felx font-chicle text-accent text-xl tracking-wide'>
                      Tax:
                    </div>
                    <div className='text-md text-gray-dark flex'>
                      € {(calculateTotalPrice() * TAX_RATE).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Grand Total */}
                <div className='flex flex-col'>
                  <div className='flex flex-row justify-between'>
                    <div className='felx font-chicle text-accent text-xl tracking-wide'>
                      Grand Total:
                    </div>
                    <div className='text-md text-gray-dark price flex rounded-3xl px-4 py-1 font-bold'>
                      € {calculateGrandTotal().toFixed(2)}
                    </div>
                  </div>
                </div>
                <span
                  className='text-accent mx-auto my-2 flex w-[100%] items-center rounded-[10px] bg-[#f4f5f3] px-4 py-2 text-left text-lg'
                  aria-label='Powered by Stripe'
                >
                  <MdLabelImportant className='hidden md:block' />
                  <span>
                    &nbsp;Tax will be applied later during payment by&nbsp;{' '}
                    <span className='font-bold'>Stripe</span>
                  </span>
                </span>
                {/* Horizontal Line */}
                <hr className='border-primary mx-auto my-4 w-[40%] border-t-2' />

                {/* Pay Now */}
                <button
                  onClick={paymentProcess}
                  className='bg-sage hover:bg-aloe hover:text-accent duration-4000 flex w-full items-center justify-center gap-1 rounded-md px-4 py-5 text-2xl text-white transition ease-linear'
                  aria-label='Pay Now'
                >
                  <FaAmazonPay size='1.9rem' />
                  <span>Pay Now</span>
                </button>
                {/* Back to  Checkout */}
                <Link
                  to='/checkout'
                  className='bg-primary text-stone hover:bg-primary-light duration-4000 mt-4 flex w-full items-center justify-center gap-2 rounded-md border-2 px-4 py-2 transition ease-linear'
                  aria-label='Sponsor Tree page'
                >
                  <RiArrowGoBackLine />
                  <span>Back to Checkout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
