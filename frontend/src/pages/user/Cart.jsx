import { useContext } from 'react';
import backgroundImage from '../../assets/images/leaves_background_01.webp';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import { MdAddShoppingCart } from 'react-icons/md';
import { BsCartXFill } from 'react-icons/bs';
import { FaCartArrowDown } from 'react-icons/fa6';
import { LuPlus, LuMinus } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { CartContext } from '@/context/cart-context';
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
      <div className='cart-page-container bg-gray-light text-stone relative mx-auto flex w-full items-center justify-center p-4 pb-[25px] md:p-6 md:pb-[40px] lg:bg-none lg:pb-[100px] xl:pb-[120px]'>
        {/* Overlay with background image and opacity */}
        <div
          className='cart-page-bg absolute left-0 top-0 hidden h-full w-full bg-contain bg-top bg-no-repeat lg:block'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.2 }}
        ></div>

        <div className='xs:p-2 mt-[2px] w-full rounded-lg bg-white p-3 shadow-lg md:p-4 lg:relative lg:z-0 lg:mt-[100px] lg:w-11/12 lg:p-8 xl:mt-[120px] xl:w-[90%] 2xl:w-[80%]'>
          <div className='flex items-center justify-between'>
            <div className='text-sage mx-auto flex w-full flex-row items-center justify-start rounded-[15px] py-4 sm:items-start'>
              <div className='mr-[10px] flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white'>
                <FaCartArrowDown size='2rem' />
              </div>
              <h3 className='font-chicle hidden text-3xl md:block'>
                {' '}
                Sponsorship Cart
              </h3>
            </div>
            {cartProducts.length > 0 && (
              <Link
                to='/checkout'
                className='bg-sage hover:bg-aloe hover:text-accent duration-4000 flex h-max items-center justify-center gap-1 rounded-full px-5 py-2 text-[1.2rem] text-white transition ease-linear md:text-[1.4rem] lg:px-8 lg:text-[1.7rem]'
              >
                <MdOutlineShoppingCartCheckout /> <span>Checkout</span>
              </Link>
            )}
          </div>

          {/* Sponsor Cart */}
          <div className='mt-0 flex flex-col items-start justify-start gap-[1rem] sm:mt-10 sm:gap-[2rem] lg:flex-row'>
            {/* Payment Information */}
            {cartProducts.length > 0 && (
              <div className='w-[100%] lg:w-[30%]'>
                <div className='bg-gray-light xs:p-2 mt-4 flex flex-col gap-[0.4rem] rounded-md p-4 lg:bg-none'>
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

                  {/* Horizontal Line */}
                  <hr className='border-primary mx-auto my-2 w-[70%] border-t-2' />

                  {/* Checkout Link */}
                  <Link
                    to='/checkout'
                    className='bg-sage hover:bg-aloe hover:text-accent duration-4000 my-2 flex w-full items-center justify-center gap-1 rounded-[10px] px-4 py-2 text-center text-white transition ease-linear'
                    aria-label='Checkout page'
                  >
                    <MdOutlineShoppingCartCheckout size='1.3rem' />
                    <span>Checkout</span>
                  </Link>

                  {/* Sponsor Tree Link */}
                  <Link
                    to='/trees'
                    className='bg-primary text-stone hover:bg-primary-light duration-4000 my-2 flex w-full items-center justify-center gap-1 rounded-[10px] border-2 px-4 py-2 text-center transition ease-linear hover:border-2'
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
              <div className='mt-6 flex w-full flex-col items-center justify-start gap-9 rounded-md py-3 md:px-2 lg:mt-4 lg:w-[70%] lg:border-l-4'>
                {cartProducts.map(product => (
                  <div
                    key={product._id}
                    className='bg-gray-light flex w-full flex-col items-center justify-between gap-[0.5rem] rounded-md py-4 pt-5 sm:flex-row sm:gap-[2rem] md:px-4 md:py-6'
                  >
                    {/* Tree Photo and Name */}
                    <div className='flex w-full flex-col items-center sm:w-[25%] sm:items-start'>
                      <div className='font-chicle text-accent hidden flex-row items-center pb-2 text-xl tracking-wide sm:flex'>
                        <img
                          src={treeIcon}
                          alt='Tree Icon'
                          className='mr-2 h-[30px] w-[30px]'
                        />
                        Tree
                      </div>
                      <Link to={`/trees/${product._id}`}>
                        <div className='flex flex-col-reverse items-center sm:flex-row'>
                          <img
                            src={product.image}
                            alt={product.name}
                            className='mb-6 mr-0 mt-2 h-[200px] w-full rounded-[10px] object-cover sm:mb-0 sm:mr-2 md:h-[80px] md:w-[80px]'
                          />
                          <div
                            className={`font-chicle sm:font-open-sans text-accent sm:text-gray-dark text-center text-2xl font-bold sm:text-start sm:text-[1rem]`}
                          >
                            {product.name}
                          </div>
                        </div>
                      </Link>
                    </div>

                    {/* Tree Qty */}
                    <div className='flex w-full flex-col items-start justify-start sm:w-[25%]'>
                      <div className='font-chicle text-accent hidden flex-row items-start justify-start pb-2 text-xl tracking-wide sm:block sm:flex-1'>
                        Qty
                      </div>
                      <div className='border-primary mx-auto flex flex-row items-center justify-center rounded-[10px] border p-[4px] sm:mx-0'>
                        <button
                          className='text-gray-dark bg-transparent p-2 text-lg'
                          aria-label='Remove Tree'
                          onClick={() => removeTree(product._id)}
                        >
                          <LuMinus />
                        </button>
                        <span className='mx-2 text-lg'>
                          {getTreeQuantity(product._id)}
                        </span>
                        <button
                          className='text-gray-dark bg-transparent p-2 text-lg'
                          aria-label='Add Tree'
                          onClick={() => handleAddTree(product)}
                        >
                          <LuPlus />
                        </button>
                      </div>
                    </div>

                    {/* Tree Price */}
                    <div className='flex w-full flex-col items-start pt-0 sm:w-[25%]'>
                      <div className='font-chicle text-accent hidden pb-2 text-xl tracking-wide sm:flex'>
                        Price
                      </div>
                      <div className='mx-auto flex flex-col text-center sm:mx-0 sm:text-left'>
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
                    <div className='mb-12 mt-auto flex w-full flex-col items-center sm:mb-auto sm:w-[25%]'>
                      <button
                        className='bg-red hover:text-red duration-4000 my-auto ml-0 rounded-[10px] border-2 px-8 py-2 text-white transition ease-linear hover:bg-white sm:ml-auto'
                        aria-label='Remove Tree'
                        onClick={() => removeButton(product._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <div className='mx-auto flex w-full'>
                  <button
                    className='bg-aloe text-accent hover:bg-sage duration-4000 my-2 mb-6 flex w-full items-center justify-center gap-1 rounded-[10px] px-4 py-2 text-center transition ease-linear hover:text-white sm:mb-0'
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
              <div className='mx-auto my-8 flex flex-col text-center'>
                <div className='mb-4 flex items-center'>
                  <img
                    src={treeIcon}
                    alt='Tree Icon'
                    className='mr-2 h-[30px] w-[30px]'
                  />
                  <h3 className='text-accent font-chicle border-primary inline-block border-b-2 text-3xl tracking-wide'>
                    Your cart is empty.
                  </h3>
                </div>
                <Link
                  to='/trees'
                  className='bg-primary text-stone hover:bg-primary-light duration-4000 my-2 flex w-full items-center justify-center gap-1 rounded-[10px] border-2 px-4 py-2 transition ease-linear'
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
