import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from 'react-helmet-async';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import Breadcrumbs from '@/components/elements/breadcrumbs';
import Button from '@/components/elements/button';
import backgroundImage from '/images/background/leaves-background.webp';
import treeIcon from '/images/misc/tree.png';
import { useUser } from '@/context/auth-context';

// Define schema with zod
const schema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z
      .string()
      .min(5, { message: 'Please use at least 5 characters.' }),
    confirmPassword: z
      .string()
      .min(5, { message: 'Please use at least 5 characters.' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function Signup() {
  const { isAuthenticated, signUpUser, isUserLoading } = useUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Submit form data
  const onSubmit = async formData => {
    const error = await signUpUser(formData);

    if (!error) {
      navigate('/');
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/account' />;
  }

  return (
    <>
      <Helmet>
        <title>Signup | Bio Baum Bauer</title>
      </Helmet>

      {/* Container */}
      <section
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className='bg-cover bg-center bg-no-repeat'
      >
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          {/* Breadcrumbs */}
          <div className='z-[1] w-full px-5'>
            <Breadcrumbs />
          </div>

          {/* Content */}
          <div className='my-16 p-5'>
            <div
              className='mx-auto flex max-w-[500px] flex-col gap-3 rounded-md p-10 shadow-sm md:p-12'
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            >
              <div className='flex items-baseline'>
                <img
                  src={treeIcon}
                  alt='Tree Icon'
                  className='mr-2 h-[30px] w-[30px]'
                />
                <h3 className='text-accent font-chicle inline-block text-3xl tracking-wide'>
                  Sign Up
                </h3>
              </div>
              <div className='flex items-center'>
                <span className='mr-2 inline-block'>
                  Already have an account?
                </span>
                <Link to='/login' className='text-accent font-bold underline'>
                  Login
                </Link>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full space-y-3'
              >
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
                      <p className='text-red text-sm'>
                        {errors.password.message}
                      </p>
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
                {/* Confirm Password Field */}
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
                    {...register('confirmPassword')}
                    placeholder='Confirm Your Password'
                    className={`input input-bordered w-full pl-10 focus:outline-none lg:flex-1 ${
                      errors.confirmPassword
                        ? 'border-red focus:border-red'
                        : 'focus:border-primary'
                    }`}
                  />
                  <div className='mt-[2px] h-4'>
                    {errors.confirmPassword && (
                      <p className='text-red text-sm'>
                        {errors.confirmPassword.message}
                      </p>
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
                {/* Submit Button */}
                <Button type='submit' isProcessing={isUserLoading}>
                  Sign Up
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
