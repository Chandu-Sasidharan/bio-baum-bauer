import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Breadcrumbs from '@/components/breadcrumbs';
import Button from '@/components/ui/button';
import backgroundImage from '/images/background/leaves-background.webp';
import treeIcon from '/images/misc/tree.png';
import { useUser } from '@/context/auth-context';
import showAlert from '@/utils/alert';

const schema = z
  .object({
    password: z
      .string()
      .min(5, { message: 'Please use at least 5 characters.' }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export default function ResetPassword() {
  const { resetPassword, isUserLoading } = useUser();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!token) {
      showAlert('error', 'Invalid Link', 'Token is missing or invalid');
      navigate('/forgot-password');
    }
  }, [token, navigate]);

  const onSubmit = async formData => {
    if (!token) return;
    const isSuccess = await resetPassword({
      token,
      password: formData.password,
    });
    if (isSuccess) {
      reset();
      navigate('/login');
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password | Bio Baum Bauer</title>
      </Helmet>

      <section
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className='bg-cover bg-center bg-no-repeat'
      >
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <div className='w-full px-5'>
            <Breadcrumbs />
          </div>

          <div className='px-5 py-20'>
            <p className='mx-auto mb-3 w-fit'>Choose a new password.</p>
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
                  New Password
                </h3>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full space-y-3'
              >
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
                    type='password'
                    {...register('password')}
                    placeholder='New Password'
                    className={`input input-bordered input-light w-full pl-10 focus:outline-none lg:flex-1 ${
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
                </div>

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
                    type='password'
                    {...register('confirmPassword')}
                    placeholder='Confirm Password'
                    className={`input input-bordered input-light w-full pl-10 focus:outline-none lg:flex-1 ${
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
                </div>

                <Button
                  type='submit'
                  className='w-full'
                  isProcessing={isUserLoading}
                >
                  Update Password
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
