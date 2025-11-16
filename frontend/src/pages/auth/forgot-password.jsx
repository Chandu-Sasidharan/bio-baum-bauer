import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/breadcrumbs';
import Button from '@/components/ui/button';
import backgroundImage from '/images/background/leaves-background.webp';
import treeIcon from '/images/misc/tree.png';
import { useUser } from '@/context/auth-context';

const schema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export default function ForgotPassword() {
  const { requestPasswordReset, isUserLoading } = useUser();
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

  const onSubmit = async formData => {
    const isSuccess = await requestPasswordReset(formData.email);
    if (isSuccess) {
      reset();
    }
  };

  return (
    <>
      <Helmet>
        <title>Forgot Password | Bio Baum Bauer</title>
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
            <p className='mx-auto mb-3 w-fit'>
              Enter your email to reset your password.
            </p>
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
                  Forgot Password
                </h3>
              </div>
              <p className='text-sm text-primary'>
                We will send you a reset link if we find a matching account.
              </p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='w-full space-y-3'
              >
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
                    {...register('email')}
                    placeholder='Your Email'
                    className={`input input-bordered input-light w-full pl-10 focus:outline-none lg:flex-1 ${
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

                <Button
                  type='submit'
                  className='w-full'
                  isProcessing={isUserLoading}
                >
                  Send Reset Link
                </Button>
              </form>

              <div className='text-center text-sm'>
                Remembered your password?{' '}
                <Link to='/login' className='text-accent font-bold underline'>
                  Go back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
