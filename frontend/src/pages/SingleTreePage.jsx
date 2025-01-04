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
  const { loggedIn } = useContext(AuthContext);

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
        <div className='mt-0 mb-0'>
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
      <div className='flex flex-col relative w-full mx-auto bg-gray-light xs:p-0 p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px]  items-center justify-center text-stone'>
        <div className='container py-2 mb-2 rounded-lg flex justify-between items-center bg-white px-5'>
          <Link
            to='/trees'
            className='flex items-center border-2 justify-center gap-1 px-8 h-max py-1  bg-primary text-stone rounded-[10px] hover:bg-primary-light transition duration-4000 ease-linear'
            aria-label='Tree page'
          >
            <MdKeyboardDoubleArrowLeft size='1rem' />
            <span className=' text-base'>back</span>
          </Link>
          {loggedIn ? (
            <button
              className='flex items-center border-2 my-1 gap-1 px-4 py-1 bg-primary text-stone rounded-[10px] hover:bg-primary-light transition duration-4000 ease-linear'
              aria-label='Add to Cart'
              onClick={handleAddToCart}
            >
              <FaCartPlus size='1.1rem' />
              <span>Add to Cart</span>
            </button>
          ) : (
            <Tooltip content='Login/Sign Up First' trigger='hover'>
              <button
                className='flex text-center border-2 gap-1 w-full my-2 px-4 py-1 bg-gray-300 text-stone rounded-[10px]'
                aria-label='Add to Cart'
              >
                <FaCartPlus size='1.1rem' />
                <span>Add to Cart</span>
              </button>
            </Tooltip>
          )}
        </div>
        <div className='container flex flex-col lg:flex-row justify-between gap-[0.6rem] w-full bg-white rounded-[10px] p-1 md:p-6 z-9 shadow-lg'>
          {/* Tree Image */}
          <div className='w-full lg:w-[60%] mr-[2rem]'>
            <img
              className='w-full aspect-video object-cover rounded-[10px]'
              src={tree.image}
              alt={tree.name}
            />
          </div>

          {/* Tree Details */}
          <div className='w-full lg:w-[40%] flex flex-col'>
            <div className='flex w-full justify-center items-center rounded-md border-l-8 bg-sage border-accent p-4 mx-auto text-white'>
              <div className='rounded-full bg-white w-[40px] h-[40px] mb-[10px] flex items-center justify-center mr-[10px]'>
                <img
                  src={treeIcon}
                  alt=''
                  style={{ width: '35px', height: '35px', borderRadius: '50%' }}
                />
              </div>
              <h3 className='text-4xl font-chicle'>{tree.name}</h3>
            </div>
            <div className='flex flex-col items-center justify-center gap-2 text-center'>
              <div className='flex items-center py-5 gap-4'>
                <p className='font-chicle text-accent text-2xl tracking-wide bg-mint rounded-2xl px-3 py-1 '>
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
              <hr className='w-[70%] mx-auto border-t-2 border-primary my-2' />
              <div className='flex items-center mb-4'>
                <img
                  src={treeIcon1}
                  alt='Tree Icon'
                  className='w-[30px] h-[30px] mr-2'
                />
                <h3 className='text-3xl text-accent font-chicle tracking-wide border-b-2 border-primary inline-block mt-2'>
                  Description:
                </h3>
              </div>

              <div
                className='prose p-4 lg:prose-lg mb-6 text-justify text-lg'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(tree.description),
                }}
              />

              {/* Horizontal Line */}
              <hr className='w-[70%] mx-auto border-t-2 border-primary my-2' />

              {/* Add to Cart Button */}
              {loggedIn ? (
                <button
                  to='/trees'
                  className='flex items-center justify-center gap-2 text-center border-2 w-full my-2 px-4 py-2 bg-primary text-stone rounded-[10px]   hover:bg-primary-light transition duration-4000 ease-linear'
                  aria-label='Sponsor page'
                  onClick={handleAddToCart}
                >
                  <FaCartPlus size='1.1rem' />
                  <span>Add to Cart</span>
                </button>
              ) : (
                <Tooltip content='Login/Sign Up First' trigger='hover'>
                  <button
                    className='flex items-center gap-2 justify-center text-center border-2 w-full my-2 px-4 py-2 bg-gray-300 text-stone rounded-[10px]'
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
