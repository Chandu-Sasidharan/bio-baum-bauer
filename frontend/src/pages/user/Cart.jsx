import { useContext } from 'react';
import backgroundImage from '../../assets/images/leaves_background_01.webp';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import { MdAddShoppingCart } from 'react-icons/md';
import { BsCartXFill } from 'react-icons/bs';
import { FaCartArrowDown } from 'react-icons/fa6';
import { LuPlus, LuMinus } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { CartContext } from '@/store/cart-context';
import { HiHome } from 'react-icons/hi';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import { GoSponsorTiers } from 'react-icons/go';
import treeIcon from '../../assets/tree.png';

const Cart = () => {
  document.title = 'Cart';
  const {
    cartProducts,
    removeTree,
    removeButton,
    clearCart,
    getTreeQuantity,
    TAX_RATE,
    getItemTotalPrice,
    calculateTotalPrice,
    calculateGrandTotal,
    handleAddTree,
  } = useContext(CartContext);

  const aLinkValues = [{ linkTo: '/', linkIcon: HiHome, linkText: 'Home' }];
  const daLinkValues = { linkText: 'Cart' };

  return (
    <div>
      <PageBreadcrumb activeLinks={aLinkValues} deActiveLink={daLinkValues} />
      <div className='cart-page-container relative flex mx-auto items-center justify-center w-full bg-gray-light lg:bg-none p-4 md:p-6 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px] text-stone'>
        {/* Overlay with background image and opacity */}
        <div
          className='cart-page-bg hidden lg:block absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat bg-top '
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.2 }}
        ></div>

        <div className='lg:relative w-full lg:w-11/12 xl:w-[90%] 2xl:w-[80%] p-3 xs:p-2 md:p-4 lg:p-8 bg-white rounded-lg lg:z-0 shadow-lg mt-[2px] lg:mt-[100px] xl:mt-[120px]'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-row mx-auto items-center text-sage rounded-[15px] w-full py-4 sm:items-start justify-start'>
              <div className='rounded-full flex items-center justify-center bg-white w-[40px] h-[40px] mr-[10px]'>
                <FaCartArrowDown size='2rem' />
              </div>
              <h3 className='text-3xl font-chicle hidden md:block'>
                {' '}
                Sponsorship Cart
              </h3>
            </div>
            {cartProducts.length > 0 && (
              <Link
                to='/checkout'
                className='flex items-center justify-center h-max gap-1 text-[1.2rem] md:text-[1.4rem] lg:text-[1.7rem] bg-sage text-white px-5 py-2 lg:px-8 rounded-full hover:bg-aloe hover:text-accent transition duration-4000 ease-linear'
              >
                <MdOutlineShoppingCartCheckout /> <span>Checkout</span>
              </Link>
            )}
          </div>

          {/* Sponsor Cart */}
          <div className='flex flex-col items-start justify-start lg:flex-row mt-0 sm:mt-10 gap-[1rem] sm:gap-[2rem]'>
            {/* Payment Information */}
            {cartProducts.length > 0 && (
              <div className='w-[100%] lg:w-[30%]'>
                <div className='flex flex-col gap-[0.4rem] bg-gray-light lg:bg-none rounded-md mt-4 xs:p-2 p-4'>
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

                  {/* Horizontal Line */}
                  <hr className='w-[70%] mx-auto border-t-2 border-primary my-2' />

                  {/* Checkout Link */}
                  <Link
                    to='/checkout'
                    className='flex items-center justify-center gap-1 text-center w-full my-2 px-4 py-2 bg-sage text-white rounded-[10px] hover:bg-aloe hover:text-accent transition duration-4000 ease-linear'
                    aria-label='Checkout page'
                  >
                    <MdOutlineShoppingCartCheckout size='1.3rem' />
                    <span>Checkout</span>
                  </Link>

                  {/* Sponsor Tree Link */}
                  <Link
                    to='/trees'
                    className='flex items-center justify-center gap-1 text-center w-full my-2 px-4 py-2 bg-primary text-stone rounded-[10px] border-2 hover:bg-primary-light hover:border-2 transition duration-4000 ease-linear'
                    aria-label='Sponsor Tree page'
                  >
                    <MdAddShoppingCart size='1.3rem' />
                    <span>Add More Tree</span>
                  </Link>
                </div>
              </div>
            )}
            {/* Tree Image with Name, Qty, Price, Remove Tree Button */}
            {cartProducts.length > 0 && (
              <div className='w-full lg:w-[70%] flex flex-col items-center justify-start gap-9 rounded-md mt-6 lg:mt-4 py-3 md:px-2 lg:border-l-4'>
                {cartProducts.map(product => (
                  <div
                    key={product._id}
                    className='flex flex-col bg-gray-light py-4 md:px-4 md:py-6 sm:flex-row justify-between items-center gap-[0.5rem] rounded-md sm:gap-[2rem] pt-5 w-full'
                  >
                    {/* Tree Photo and Name */}
                    <div className='w-full sm:w-[25%] flex flex-col items-center sm:items-start'>
                      <div className='hidden sm:flex flex-row items-center text-xl font-chicle text-accent tracking-wide pb-2'>
                        <img
                          src={treeIcon}
                          alt='Tree Icon'
                          className='w-[30px] h-[30px] mr-2'
                        />
                        Tree
                      </div>
                      <Link to={`/trees/${product._id}`}>
                        <div className='flex items-center flex-col-reverse sm:flex-row'>
                          <img
                            src={product.image}
                            alt={product.name}
                            className='w-full h-[200px] md:w-[80px] md:h-[80px] object-cover mr-0 sm:mr-2 rounded-[10px] mt-2 mb-6 sm:mb-0'
                          />
                          <div
                            className={`text-2xl sm:text-[1rem] font-chicle sm:font-open-sans text-accent sm:text-gray-dark text-center sm:text-start font-bold`}
                          >
                            {product.name}
                          </div>
                        </div>
                      </Link>
                    </div>

                    {/* Tree Qty */}
                    <div className='w-full sm:w-[25%] flex flex-col justify-start items-start'>
                      <div className='hidden sm:flex-1 sm:block flex-row justify-start items-start text-xl font-chicle text-accent tracking-wide pb-2'>
                        Qty
                      </div>
                      <div className='flex flex-row items-center justify-center border border-primary rounded-[10px] mx-auto sm:mx-0 p-[4px]'>
                        <button
                          className='bg-transparent text-lg text-gray-dark p-2'
                          aria-label='Remove Tree'
                          onClick={() => removeTree(product._id)}
                        >
                          <LuMinus />
                        </button>
                        <span className='mx-2 text-lg'>
                          {getTreeQuantity(product._id)}
                        </span>
                        <button
                          className='bg-transparent text-lg text-gray-dark p-2'
                          aria-label='Add Tree'
                          onClick={() => handleAddTree(product)}
                        >
                          <LuPlus />
                        </button>
                      </div>
                    </div>

                    {/* Tree Price */}
                    <div className='w-full sm:w-[25%] flex flex-col items-start pt-0'>
                      <div className='hidden sm:flex text-xl font-chicle text-accent tracking-wide pb-2'>
                        Price
                      </div>
                      <div className='flex flex-col mx-auto sm:mx-0 text-center sm:text-left'>
                        <div className='text-gray-dark text-lg'>
                          € {getItemTotalPrice(product).toFixed(2)}
                        </div>
                        <div className='text-md'>
                          {' '}
                          €{' '}
                          {product.price && product.price.$numberDecimal
                            ? product.price.$numberDecimal
                            : 'N/A'}{' '}
                          each
                        </div>
                      </div>
                    </div>

                    {/* Remove Tree */}
                    <div className='w-full sm:w-[25%] flex flex-col items-center mt-auto mb-12 sm:mb-auto'>
                      <button
                        className='my-auto px-8 border-2 py-2 bg-red text-white rounded-[10px] hover:bg-white hover:text-red transition duration-4000 ease-linear ml-0 sm:ml-auto'
                        aria-label='Remove Tree'
                        onClick={() => removeButton(product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className='flex w-full mx-auto'>
                  <button
                    className='flex items-center justify-center gap-1 text-center w-full my-2 px-4 py-2 bg-aloe text-accent rounded-[10px] hover:bg-sage hover:text-white transition duration-4000 ease-linear mb-6 sm:mb-0'
                    aria-label='Clear Cart'
                    onClick={() => clearCart()}
                  >
                    <BsCartXFill size='1.3rem' />
                    <span>Clear Cart</span>
                  </button>
                </div>
              </div>
            )}

            {/* Empty Cart Message and Link */}
            {cartProducts.length === 0 && (
              <div className='flex flex-col mx-auto text-center my-8'>
                <div className='flex items-center mb-4'>
                  <img
                    src={treeIcon}
                    alt='Tree Icon'
                    className='w-[30px] h-[30px] mr-2'
                  />
                  <h3 className='text-3xl text-accent font-chicle tracking-wide border-b-2 border-primary inline-block'>
                    Your cart is empty.
                  </h3>
                </div>
                <Link
                  to='/trees'
                  className='flex items-center gap-1 justify-center border-2 w-full my-2 px-4 py-2 bg-primary text-stone rounded-[10px] hover:bg-primary-light transition duration-4000 ease-linear'
                  aria-label='Sponsor Tree page'
                >
                  {' '}
                  <GoSponsorTiers />
                  <span>Sponsor a Tree</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
