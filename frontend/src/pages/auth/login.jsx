import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from 'react-helmet-async';
import { Button, Tooltip, Spinner } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import axios from '@/utils/axiosInstance';
import { AuthContext } from '@/store/auth-context';
import { Breadcrumb, BreadcrumbItem } from '@/components/elements/breadcrumb';
import backgroundImage from '/images/background/leaves-background.webp';
import treeIcon from '/images/misc/tree.png';
import showAlert from '@/utils/alert';

// Define schema with zod
const schema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(5, { message: 'Please use at least 5 characters.' }),
});

export default function Login() {
  const { loggedIn, setLoggedIn, setAuthUser, setExpiredTime } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (loggedIn) {
      navigate('/dashboard');
    }
  }, [loggedIn, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Submit form data
  const onSubmit = async formData => {
    setIsProcessing(true);

    try {
      const response = await axios.post('/api/users/login', formData);

      if (response.status === 200) {
        setAuthUser(response.data.user);
        setExpiredTime(Date.now() + 3600000);
        setLoggedIn(true);
        reset();
        // Display success message
        showAlert(
          'success',
          'Login Successful!',
          'You have successfully logged in.'
        );
        navigate('/dashboard');
      } else {
        // Handle other server response statuses
        showAlert(
          'error',
          'Login Failed',
          response.data.message || 'An error occurred during login!'
        );
      }
    } catch (error) {
      // Handle errors that occurred during the POST request
      let errorMessage = 'An error occurred during login!';
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = '<ul>';
          // Loop through error messages and append to the list
          error.response.data.errors.forEach(err => {
            errorMessage += `<li>${err.msg}</li>`;
          });
          errorMessage += '</ul>';
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }

      showAlert('error', 'Login Failed', null, errorMessage);
    } finally {
      setIsProcessing(false);
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
              <Link to='/signup' className='text-accent font-bold underline'>
                Sign Up
              </Link>
            </Tooltip>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-3'>
            {/* Email Field */}
            <div className='relative'>
              <label className='absolute left-3 top-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                  className='h-4 w-4 opacity-70'
                >
                  <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
                  <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
                </svg>
              </label>
              <input
                type='email'
                name='email'
                {...register('email')}
                placeholder='Your Email'
                className={`input input-bordered w-full pl-10 focus:outline-none lg:flex-1 ${
                  errors.email
                    ? 'border-red focus:border-red'
                    : 'focus:border-primary'
                }`}
              />
              <div className='mt-[2px] h-4'>
                {errors.email && (
                  <p className='text-red text-sm'>{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className='relative'>
              <label className='absolute left-3 top-[16px]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 16 16'
                  fill='currentColor'
                  className='h-4 w-4 opacity-70'
                >
                  <path
                    fillRule='evenodd'
                    d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
                    clipRule='evenodd'
                  />
                </svg>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder='Your Password'
                className={`input input-bordered w-full pl-10 focus:outline-none lg:flex-1 ${
                  errors.password
                    ? 'border-red focus:border-red'
                    : 'focus:border-primary'
                }`}
              />
              <div className='mt-[2px] h-4'>
                {errors.password && (
                  <p className='text-red text-sm'>{errors.password.message}</p>
                )}
              </div>

              <div
                className='absolute right-3 top-[13px] cursor-pointer'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <HiEyeOff className='text-2xl' />
                ) : (
                  <HiEye className='text-2xl' />
                )}
              </div>
            </div>

            {/* Forget Password */}
            <div className='flex items-center gap-2'>
              <Tooltip content='Click here to reset your password'>
                <Link to='' className='text-accent underline'>
                  Forgot Password?
                </Link>
              </Tooltip>
            </div>

            {/* Submit Button */}
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
