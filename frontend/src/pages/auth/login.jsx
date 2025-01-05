import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button, Label, TextInput, Tooltip, Spinner } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import backgroundImage from '../../assets/images/leaves_background_02.webp';
import { AuthContext } from '@/store/auth-context';
import axios from '../../utils/axiosInstance';
import Swal from 'sweetalert2';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import treeIcon from '../../assets/tree.png';
import { AiOutlineLogin } from 'react-icons/ai';
import { Breadcrumb, BreadcrumbItem } from '@/components/elements/breadcrumb';

export default function Login() {
  const { loggedIn, setLoggedIn, setAuthUser, setExpiredTime } =
    useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedIn) {
      navigate('/dashboard');
    }
  }, [loggedIn, navigate]);

  const [errors, setErrors] = useState([]);
  const [backError, setBackError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async e => {
    e.preventDefault();
    const loginData = new FormData(e.target);

    const data = {
      email: loginData.get('email'),
      password: loginData.get('password'),
    };
    setIsProcessing(true);
    try {
      const response = await axios.post('/api/users/login', data);
      setErrors([]);
      setBackError('');
      if (response.status === 200) {
        setAuthUser(response.data.user);
        setExpiredTime(Date.now() + 3600000);
        setLoggedIn(true);
        setIsProcessing(false);
        // Display success message
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
          customClass: {
            confirmButton: 'btn-custom-class',
            title: 'title-class',
          },
          buttonsStyling: false,
        });
        navigate('/dashboard');
      } else {
        // Handle other server response statuses
        console.error('Error logging in:', response.data.message);
        setIsProcessing(false);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: response.data.message || 'An error occurred during login!',
          customClass: {
            confirmButton: 'btn-custom-class',
            title: 'title-class',
          },
          buttonsStyling: false,
        });
      }
    } catch (error) {
      setErrors([]);
      setBackError('');
      setIsProcessing(false);
      // Handle errors that occurred during the POST request
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);

        let errorMessage = '<ul>';

        // Loop through error messages and append to the list
        error.response.data.errors.forEach(error => {
          errorMessage += `<li>${error.msg}</li>`;
        });

        errorMessage += '</ul>';

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          html: errorMessage,
          customClass: {
            confirmButton: 'btn-custom-class',
            title: 'title-class',
          },
          buttonsStyling: false,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text:
            error.response?.data.message || 'An error occurred during login!',
          customClass: {
            confirmButton: 'btn-custom-class',
            title: 'title-class',
          },
          buttonsStyling: false,
        });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Bio Baum Bauer</title>
      </Helmet>

      <div className='relative flex flex-col items-center'>
        {/* Overlay with background image and opacity */}
        <div
          className='absolute left-0 top-0 z-[0] h-full w-full bg-cover bg-top bg-no-repeat'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.2 }}
        ></div>

        {/* Flex Row1 */}
        <Breadcrumb label='Site navigation' className='self-start px-4 py-2'>
          <HiHome />
          <BreadcrumbItem href='/'>Home</BreadcrumbItem>
          <BreadcrumbItem current>Login</BreadcrumbItem>
        </Breadcrumb>

        {/* Flex Row2 */}
        <div className='bg-primary-light static z-[1] mx-auto my-16 flex w-full max-w-[calc(100%-2.5rem)] flex-col gap-5 rounded-md p-6 shadow-md sm:mb-24 sm:max-w-[500px]'>
          <div className='flex items-baseline'>
            <img
              src={treeIcon}
              alt='Tree Icon'
              className='mr-2 h-[30px] w-[30px]'
            />
            <h3 className='text-accent font-chicle inline-block text-3xl tracking-wide'>
              Login
            </h3>
          </div>
          <div className='flex items-center'>
            <span className='mr-2 inline-block'>New to the farm?</span>
            <Tooltip content='Click here to sign up'>
              <Link to='/register' className='text-accent font-bold underline'>
                Register
              </Link>
            </Tooltip>
          </div>

          <form onSubmit={handleLogin} className='w-full space-y-6'>
            <div>
              <Label
                htmlFor='email'
                value='Your Email Address'
                className='visually-hidden'
              />
              <TextInput
                id='email'
                type='email'
                name='email'
                placeholder='Your Email Address'
                className='h-[42px]'
              />
            </div>
            <div style={{ position: 'relative' }}>
              <Label
                htmlFor='password'
                value='Your Password'
                className='visually-hidden'
              />
              <TextInput
                id='password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Your Password'
                className='h-[42px]'
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <HiEyeOff className='text-2xl' />
                ) : (
                  <HiEye className='text-2xl' />
                )}
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Tooltip content='Click here to reset your password'>
                <Link to='' className='text-accent underline'>
                  Forgot Password?
                </Link>
              </Tooltip>
            </div>
            <div className='flex flex-row gap-3'>
              <Button
                type='submit'
                className='bg-accent hover:!bg-accent-light text-primary-light rounded-sm tracking-wider duration-300 focus:ring-0'
              >
                {isProcessing ? (
                  <>
                    <Spinner
                      aria-label='Processing'
                      size='sm'
                      color='text-primary-light'
                    />
                    <span className='pl-3'>Logging in...</span>
                  </>
                ) : (
                  <span>&nbsp;Login</span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
