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
import useCopy from '@/hooks/use-copy';
import useLocalizedPath from '@/hooks/use-localized-path';

const copy = {
  de: {
    metaTitle: 'Passwort vergessen | Bio Baum Bauer',
    prompt: 'Gib deine E-Mail-Adresse ein, um dein Passwort zurückzusetzen.',
    heading: 'Passwort vergessen',
    hint: 'Wir senden dir einen Link, wenn wir ein passendes Konto finden.',
    button: 'Link zum Zurücksetzen senden',
    bottom: 'Passwort doch gemerkt?',
    backToLogin: 'Zurück zum Login',
    fields: {
      emailPlaceholder: 'Deine E-Mail-Adresse',
    },
    errors: {
      email: 'Bitte gib eine gültige E-Mail-Adresse ein.',
    },
  },
  en: {
    metaTitle: 'Forgot Password | Bio Baum Bauer',
    prompt: 'Enter your email to reset your password.',
    heading: 'Forgot Password',
    hint: 'We will send you a reset link if we find a matching account.',
    button: 'Send Reset Link',
    bottom: 'Remembered your password?',
    backToLogin: 'Go back to login',
    fields: {
      emailPlaceholder: 'Your Email',
    },
    errors: {
      email: 'Please enter a valid email address.',
    },
  },
};

const createSchema = texts =>
  z.object({
    email: z.string().email({ message: texts.errors.email }),
  });

export default function ForgotPassword() {
  const { requestPasswordReset, isUserLoading } = useUser();
  const { buildPath } = useLocalizedPath();
  const text = useCopy(copy);
  const schema = createSchema(text);
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
        <title>{text.metaTitle}</title>
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
            <p className='mx-auto mb-3 w-fit'>{text.prompt}</p>
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
                  {text.heading}
                </h3>
              </div>
              <p className='text-sm text-primary'>{text.hint}</p>
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
                    placeholder={text.fields.emailPlaceholder}
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
                  {text.button}
                </Button>
              </form>

              <div className='text-center text-sm'>
                {text.bottom}{' '}
                <Link
                  to={buildPath('login')}
                  className='text-accent font-bold underline'
                >
                  {text.backToLogin}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
