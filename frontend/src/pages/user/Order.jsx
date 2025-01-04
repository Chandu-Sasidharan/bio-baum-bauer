import { useContext } from 'react';
import backgroundImage from '../../assets/images/leaves_background_01.webp';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { CartContext } from '@/store/cart-context';
import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { MdLabelImportant } from 'react-icons/md';
import axios from '../../utils/axiosInstance';
import { loadStripe } from '@stripe/stripe-js';
import { AuthContext } from '@/store/auth-context';
import { usePatronContext } from '../../store/PatronContext';
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
        <div className='mt-0 mb-0'>
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
      <div className='cart-page-container relative w-full bg-gray-light mx-auto p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px] flex items-center justify-center text-stone'>
        {/* Overlay with background image and opacity */}
        <div
          className='cart-page-bg hidden lg:block absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat bg-top'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.2 }}
        ></div>

        <div className='w-full xl:w-[90%] 2xl:w-[80%] bg-white rounded-base p-3 lg:p-8 shadow-lg rounded-md lg:mt-[100px] xl:mt-[120px]'>
          {/* Sponsor Cart */}
          <div className='flex flex-col-reverse items-start justify-start lg:flex-row md:gap-[1rem] gap-[2rem]'>
            {/* Tree Image with Name, Qty, Price, Remove Tree Button */}
            {cartProducts.length > 0 ? (
              <div className='w-full lg:w-[60%] flex flex-col items-start justify-start sm:gap-[2rem] bg-white rounded-md p-4 '>
                {' '}
                <div className='flex flex-col text-gray-dark'>
                  <div className='flex items-center gap-2 mb-4'>
                    <BiSolidUserDetail size='2.1rem' />
                    <h3 className='text-3xl text-accent font-chicle tracking-wide border-b-2 border-primary inline-block'>
                      Patron Details
                    </h3>
                  </div>{' '}
                  <div className='flex flex-col'>
                    {' '}
                    <p className='text-gray-dark '>
                      <span className='font-semibold text-lg text-gray-dark'>
                        Full Name:
                      </span>
                      <span>
                        &nbsp;&nbsp;{newPatron.firstName}&nbsp;
                        {newPatron.lastName}
                      </span>
                    </p>
                    <p className='text-gray-dark '>
                      <span className='font-semibold text-lg text-gray-dark'>
                        Email:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.email}</span>
                    </p>
                    <p className='text-gray-dark '>
                      <span className='font-semibold text-lg text-gray-dark'>
                        Mobile Phone:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.mobilePhone}</span>
                    </p>
                    {/* Display address details */}
                    <p className='text-gray-dark '>
                      <span className='font-semibold text-lg text-gray-dark'>
                        Address Line 1:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.address.address1}</span>
                    </p>
                    <p className='text-gray-dark '>
                      <span className='font-semibold text-lg text-gray-dark'>
                        Additional Address Details:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.address.address2}</span>
                    </p>
                    <p className='text-gray-dark '>
                      <span className='font-semibold text-lg text-gray-dark'>
                        City:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.address.city}</span>
                    </p>
                    <p className='text-gray-dark '>
                      <span className='font-semibold text-lg text-gray-dark'>
                        Postcode:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.address.zipCode}</span>
                    </p>
                    <p className='text-gray-dark '>
                      <span className='font-semibold text-lg text-gray-dark'>
                        State/Country:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.address.state}</span>
                    </p>
                    <p className='text-gray-dark '>
                      <span className='font-semibold text-lg text-gray-dark'>
                        Country:
                      </span>
                      <span>&nbsp;&nbsp;{newPatron.address.country}</span>
                    </p>
                  </div>
                </div>
                {/* Horizontal Line */}
                <hr className='w-[100%] mx-auto border-t-2 border-primary my-2' />
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
            <div className='w-full lg:w-2/5 '>
              <div className='flex flex-col lg:border-l-4 lg:border-aloe gap-[0.4rem] bg-gray-light rounded-md py-4 px-3'>
                {/* Total Price */}
                <div className='flex flex-col'>
                  <div className='flex flex-row justify-between'>
                    <div className='felx text-xl font-chicle text-accent tracking-wide'>
                      Total Price:
                    </div>
                    <div className='flex text-md text-gray-dark'>
                      € {calculateTotalPrice().toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Tax */}
                <div className='flex flex-col'>
                  <div className='flex flex-row justify-between'>
                    <div className='felx text-xl font-chicle text-accent tracking-wide'>
                      Tax:
                    </div>
                    <div className='flex text-md text-gray-dark'>
                      € {(calculateTotalPrice() * TAX_RATE).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Grand Total */}
                <div className='flex flex-col'>
                  <div className='flex flex-row justify-between'>
                    <div className='felx text-xl font-chicle text-accent tracking-wide'>
                      Grand Total:
                    </div>
                    <div className='flex text-md text-gray-dark price px-4 py-1 rounded-3xl font-bold'>
                      € {calculateGrandTotal().toFixed(2)}
                    </div>
                  </div>
                </div>
                <span
                  className='flex items-center text-left text-lg w-[100%] mx-auto my-2 px-4 py-2 bg-[#f4f5f3] text-accent rounded-[10px]'
                  aria-label='Powered by Stripe'
                >
                  <MdLabelImportant className='hidden md:block' />
                  <span>
                    &nbsp;Tax will be applied later during payment by&nbsp;{' '}
                    <span className='font-bold'>Stripe</span>
                  </span>
                </span>
                {/* Horizontal Line */}
                <hr className='w-[40%] mx-auto border-t-2 border-primary my-4' />

                {/* Pay Now */}
                <button
                  onClick={paymentProcess}
                  className='flex items-center justify-center gap-1 text-2xl w-full px-4 py-5 bg-sage text-white rounded-md hover:bg-aloe hover:text-accent transition duration-4000 ease-linear'
                  aria-label='Pay Now'
                >
                  <FaAmazonPay size='1.9rem' />
                  <span>Pay Now</span>
                </button>
                {/* Back to  Checkout */}
                <Link
                  to='/checkout'
                  className='flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary border-2 text-stone rounded-md hover:bg-primary-light transition duration-4000 ease-linear mt-4'
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
