import { useState, useEffect, useContext } from 'react';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import treeIcon from '/src/assets/images/tree_icon.svg';
import treeIcon1 from '/src/assets/tree.png';
import { CartContext } from '@/store/cart-context';
import { AuthContext } from '@/store/auth-context';
import DOMPurify from 'dompurify';
import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { FaTree } from 'react-icons/fa';
import { Button, Tooltip } from 'flowbite-react';
import { FaCartPlus } from 'react-icons/fa';

const SingleTreePage = () => {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const { addTree } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Tree Detail';
    const fetchTree = async () => {
      try {
        const response = await axios.get(`/api/tree/${id}`);
        setTree(response.data);
      } catch (error) {
        console.error('Error fetching tree:', error);
      }
    };

    fetchTree();
  }, [id]);

  const handleAddToCart = () => {
    addTree(id);
    // Redirect to the cart page
    navigate('/cart');
  };

  if (!tree) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      {tree && (
        <div className='mb-0 mt-0'>
          <Breadcrumb
            aria-label='This is Breadcrumb showing the location of current page'
            className='bg-gray-50 px-5 py-3 dark:bg-gray-800'
          >
            <Breadcrumb.Item href='/' icon={HiHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href='/trees' icon={FaTree}>
              Trees
            </Breadcrumb.Item>
            <Breadcrumb.Item>{tree.name}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      )}
      <div className='bg-gray-light xs:p-0 text-stone relative mx-auto flex w-full flex-col items-center justify-center p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px]'>
        <div className='container mb-2 flex items-center justify-between rounded-lg bg-white px-5 py-2'>
          <Link
            to='/trees'
            className='bg-primary text-stone hover:bg-primary-light duration-4000 flex h-max items-center justify-center gap-1 rounded-[10px] border-2 px-8 py-1 transition ease-linear'
            aria-label='Tree page'
          >
            <MdKeyboardDoubleArrowLeft size='1rem' />
            <span className='text-base'>back</span>
          </Link>
          {isAuthenticated ? (
            <button
              className='bg-primary text-stone hover:bg-primary-light duration-4000 my-1 flex items-center gap-1 rounded-[10px] border-2 px-4 py-1 transition ease-linear'
              aria-label='Add to Cart'
              onClick={handleAddToCart}
            >
              <FaCartPlus size='1.1rem' />
              <span>Add to Cart</span>
            </button>
          ) : (
            <Tooltip content='Login/Sign Up First' trigger='hover'>
              <button
                className='text-stone my-2 flex w-full gap-1 rounded-[10px] border-2 bg-gray-300 px-4 py-1 text-center'
                aria-label='Add to Cart'
              >
                <FaCartPlus size='1.1rem' />
                <span>Add to Cart</span>
              </button>
            </Tooltip>
          )}
        </div>
        <div className='z-9 container flex w-full flex-col justify-between gap-[0.6rem] rounded-[10px] bg-white p-1 shadow-lg md:p-6 lg:flex-row'>
          {/* Tree Image */}
          <div className='mr-[2rem] w-full lg:w-[60%]'>
            <img
              className='aspect-video w-full rounded-[10px] object-cover'
              src={tree.image}
              alt={tree.name}
            />
          </div>

          {/* Tree Details */}
          <div className='flex w-full flex-col lg:w-[40%]'>
            <div className='bg-sage border-accent mx-auto flex w-full items-center justify-center rounded-md border-l-8 p-4 text-white'>
              <div className='mb-[10px] mr-[10px] flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white'>
                <img
                  src={treeIcon}
                  alt=''
                  style={{ width: '35px', height: '35px', borderRadius: '50%' }}
                />
              </div>
              <h3 className='font-chicle text-4xl'>{tree.name}</h3>
            </div>
            <div className='flex flex-col items-center justify-center gap-2 text-center'>
              <div className='flex items-center gap-4 py-5'>
                <p className='font-chicle text-accent bg-mint rounded-2xl px-3 py-1 text-2xl tracking-wide'>
                  € {tree.price && tree.price.$numberDecimal}
                </p>
                <p>
                  <span className='text-gray-dark font-bold'>
                    Category:&nbsp;&nbsp;
                  </span>
                  <span className='font-bold'>{tree.category}</span>
                </p>
                <p>
                  <span className='text-gray-dark font-bold'>
                    Stock:&nbsp;&nbsp;
                  </span>
                  <span className='font-bold'>{tree.availableQuantity}</span>
                </p>
              </div>

              {/* Horizontal Line */}
              <hr className='border-primary mx-auto my-2 w-[70%] border-t-2' />
              <div className='mb-4 flex items-center'>
                <img
                  src={treeIcon1}
                  alt='Tree Icon'
                  className='mr-2 h-[30px] w-[30px]'
                />
                <h3 className='text-accent font-chicle border-primary mt-2 inline-block border-b-2 text-3xl tracking-wide'>
                  Description:
                </h3>
              </div>

              <div
                className='prose lg:prose-lg mb-6 p-4 text-justify text-lg'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(tree.description),
                }}
              />

              {/* Horizontal Line */}
              <hr className='border-primary mx-auto my-2 w-[70%] border-t-2' />

              {/* Add to Cart Button */}
              {isAuthenticated ? (
                <button
                  to='/trees'
                  className='bg-primary text-stone hover:bg-primary-light duration-4000 my-2 flex w-full items-center justify-center gap-2 rounded-[10px] border-2 px-4 py-2 text-center transition ease-linear'
                  aria-label='Sponsor page'
                  onClick={handleAddToCart}
                >
                  <FaCartPlus size='1.1rem' />
                  <span>Add to Cart</span>
                </button>
              ) : (
                <Tooltip content='Login/Sign Up First' trigger='hover'>
                  <button
                    className='text-stone my-2 flex w-full items-center justify-center gap-2 rounded-[10px] border-2 bg-gray-300 px-4 py-2 text-center'
                    aria-label='Sponsor page'
                  >
                    <FaCartPlus size='1.1rem' />
                    <span>Add to Cart</span>
                  </button>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleTreePage;
