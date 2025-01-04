import { useContext, useState } from 'react';
import { Breadcrumb } from 'flowbite-react';
import axios from '../../utils/axiosInstance';
import { HiHome } from 'react-icons/hi';
import backgroundImage from '../../assets/images/leaves_background_01.webp';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/store/auth-context';
import Swal from 'sweetalert2';
import { LiaSignOutAltSolid } from 'react-icons/lia';
import treeImage from '../../assets/tree.png';

const Signout = () => {
  document.title = 'Signout';
  const { setLoggedIn, setAuthUser, setExpiredTime } = useContext(AuthContext);
  const [signingOut, setSigningOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setSigningOut(true);
    try {
      await axios.get('/api/users/logout');
      setLoggedIn(false);
      setExpiredTime(null);
      setAuthUser({});
      // Display success message
      Swal.fire({
        icon: 'success',
        title: 'Logout Successful!',
        text: 'You have successfully logged out.',
        customClass: {
          confirmButton: 'btn-custom-class',
          title: 'title-class',
        },
        buttonsStyling: false,
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Display error message
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text:
          error.response?.data.message || 'An error occurred during logout!',
        customClass: {
          confirmButton: 'btn-custom-class',
          title: 'title-class',
        },
        buttonsStyling: false,
      });
    }
  };

  return (
    <main>
      <Breadcrumb
        aria-label=''
        className='bg-gray-50 px-5 py-3 dark:bg-gray-800'
      >
        <Breadcrumb.Item href='/' icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item>Sign Out</Breadcrumb.Item>
      </Breadcrumb>
      <div className='relative w-full mx-auto p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px] flex items-center justify-center text-stone'>
        {/* Overlay with background image and opacity */}
        <div
          className='absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-top z-[-1]'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.2 }}
        ></div>

        <div className='flex flex-col justify-center items-center gap-[2rem] xs:w-[100%] sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] bg-white rounded-[15px] p-8 z-9 shadow-lg mt-[50px] md:mt-[80px] lg:mt-[100px] xl:mt-[120px]'>
          <div className='flex items-center mb-4'>
            <img
              src={treeImage}
              alt='Tree Icon'
              className='w-[40px] h-[40px] mr-2'
            />{' '}
            <h3 className='text-3xl text-accent font-chicle tracking-wide border-b-2 border-primary inline-block'>
              Sign Out
            </h3>
          </div>
          <p className='text-3xl text-accent font-chicle tracking-wide mt-6 text-center'>
            Are you sure you want to sign out?
          </p>
          <Link
            to='/login'
            onClick={handleLogout} // Add onClick to trigger logout
            className='flex items-center my-2 gap-2 px-8 py-2 bg-primary text-stone rounded-[10px] hover:bg-primary-light transition duration-4000 ease-linear'
            aria-label='Sign Out and go to the Login page'
          >
            <LiaSignOutAltSolid size='1.2rem' />
            <span>Sign Out</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Signout;
