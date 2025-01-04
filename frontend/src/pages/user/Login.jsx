import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Label,
  TextInput,
  Breadcrumb,
  Tooltip,
  Spinner,
} from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import backgroundImage from '../../assets/images/leaves_background_02.webp';
import { AuthContext } from '@/store/auth-context';
import { IoIosArrowForward } from 'react-icons/io';
import axios from '../../utils/axiosInstance';
import Swal from 'sweetalert2';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import treeIcon from '../../assets/tree.png';
import { AiOutlineLogin } from 'react-icons/ai';
import LoginFooterImage from '../../assets/images/biobaum_about_footer_img.webp';

const Login = () => {
  document.title = 'Login';
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
  const [loggingIn, setLoggingIn] = useState(false);

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
    setLoggingIn(true);
    try {
      const response = await axios.post('/api/users/login', data);
      setErrors([]);
      setBackError('');
      if (response.status === 200) {
        setAuthUser(response.data.user);
        setExpiredTime(Date.now() + 3600000);
        setLoggedIn(true);
        setLoggingIn(false);
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
        setLoggingIn(false);
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
      setLoggingIn(false);
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
    <main>
      <Breadcrumb
        aria-label=''
        className='bg-gray-50 px-5 py-3 dark:bg-gray-800'
      >
        <Breadcrumb.Item href='/' icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item>Sign In</Breadcrumb.Item>
      </Breadcrumb>
      <div className='relative w-full mx-auto xs:p-0 p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px] flex flex-col items-center justify-center text-stone'>
        {/* Overlay with background image and opacity */}
        <div
          className='absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-top z-[-1]'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.4 }}
        ></div>
        {/*       <div className="container mx-auto flex justify-center items-center ">
          <ul className="bg-white py-4 px-2 rounded-md text-red-700">
            {errors.map((error, index) => (
              <li key={error.path + index} className="flex items-center">
                <IoIosArrowForward /> <span>&nbsp;{error.msg}</span>
              </li>
            ))}
            {backError ? (
              <li className="flex items-center">
                <IoIosArrowForward />
                <span>&nbsp;{backError}</span>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div> */}
        <div
          className={`flex flex-col justify-start items-start gap-[2rem] w-full md:w-[80%] lg:w-[45%] xl:w-[40%] rounded-[15px] p-4 sm:p-8 z-9 shadow-lg mt-[10px] md:mt-[20px] lg:mt-[100px] xl:mt-[90px] xs:py-12 py-10 ${
            loggingIn ? 'bg-gray-light text-gray-400 opacity-80' : 'bg-white '
          }`}
        >
          <div className='flex items-center'>
            <img
              src={treeIcon}
              alt='Tree Icon'
              className='w-[30px] h-[30px] mr-2'
            />
            <h3 className='text-3xl text-accent font-chicle tracking-wide border-b-2 border-primary inline-block'>
              Login
            </h3>
          </div>
          <div className='flex items-center'>
            <span>Don't have an account ?&nbsp;&nbsp;</span>
            <Tooltip content='Click here to navigate to register page'>
              <Link to='/register' className='text-accent underline font-bold'>
                signup
              </Link>
            </Tooltip>
          </div>
          <form onSubmit={handleLogin} className='space-y-6 w-full'>
            <div>
              <Label
                htmlFor='email'
                value='Your email'
                className='visually-hidden'
              />
              <TextInput
                id='email'
                type='email'
                name='email'
                placeholder='Email Address *'
                style={{
                  backgroundColor: 'var(--bg-white)',
                  borderColor: 'var(--primary)',
                  outlineColor: 'var(--accent)',
                  padding: '1.15rem',
                  color: 'var(--stone)',
                  fontSize: '1rem',
                }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <Label
                htmlFor='password'
                value='Your password'
                className='visually-hidden'
              />
              <TextInput
                id='password'
                type={showPassword ? 'text' : 'password'}
                name='password'
                placeholder='Your Password *'
                style={{
                  backgroundColor: 'var(--bg-white)',
                  borderColor: 'var(--primary)',
                  outlineColor: 'var(--accent)',
                  padding: '1.15rem',
                  color: 'var(--stone)',
                  fontSize: '1rem',
                  paddingRight: '2.5rem', // Make room for the icon
                }}
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
              <span>We will remember you until you logout!</span>
              <Tooltip content='click here to reset your password'>
                <Link to='' className='ml-10 text-accent underline'>
                  Forgot Password?
                </Link>
              </Tooltip>
            </div>
            <div className='flex flex-row gap-3'>
              {loggingIn ? (
                <Button className='custom-button-style'>
                  <Spinner
                    aria-label='Alternate spinner button example'
                    size='sm'
                  />
                  <span className='pl-3'>Logging in...</span>
                </Button>
              ) : (
                <Button type='submit' className='custom-button-style'>
                  <AiOutlineLogin />
                  <span>&nbsp;Login</span>
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
