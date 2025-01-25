import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from '@/utils/axios';
import Button from '@/components/elements/button';
import showAlert from '@/utils/alert';
import formatError from '@/utils/format-error';

// Define schema with zod
const schema = z.object({
  userName: z
    .string()
    .min(3, { message: 'Name should have a minimum length of 3' })
    .max(50, { message: 'Name should have a maximum length of 50' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(1, { message: 'Message is required' }),
  agreeToPolicies: z.boolean().refine(val => val === true, {
    message: 'please agree to the terms and conditions',
  }),
});

export default function Form() {
  const [isProcessing, setIsProcessing] = useState(false);
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

  const onSubmit = async formData => {
    setIsProcessing(true);
    try {
      const response = await axios.post('/api/contact/create', formData);

      if (response.status === 201) {
        showAlert('success', 'Thank you!', response.data.message);
        // Clear the form
        reset();
      } else {
        // Handle other server response statuses
        showAlert(
          'error',
          'Message Failed',
          response.data.message || 'Something went wrong!'
        );
      }
    } catch (error) {
      const errorMessage = formatError(error);
      showAlert('error', 'Sign Up Failed', null, errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form
      className='flex w-full flex-col gap-1'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Name */}
      <div>
        <label
          htmlFor='userName'
          className='text-primary-dark mb-1 ml-1 block text-sm'
        >
          Name *
        </label>
        <input
          type='text'
          name='userName'
          placeholder='Your name'
          {...register('userName')}
          className={`input text-stone input-bordered w-full cursor-pointer focus:outline-none lg:flex-1 ${
            errors.userName
              ? 'border-red focus:border-red'
              : 'focus:border-primary'
          }`}
        />
        <div className='mt-[3px] h-4'>
          {errors.userName && (
            <p className='text-red text-xs'>{errors.userName.message}</p>
          )}
        </div>
      </div>

      {/* Email Address */}
      <div>
        <label
          htmlFor='emailAddress'
          className='text-primary-dark mb-2 ml-1 block text-sm'
        >
          Email Address *
        </label>
        <input
          type='email'
          name='email'
          placeholder='email@example.com'
          {...register('email')}
          className={`input text-stone input-bordered w-full cursor-pointer focus:outline-none lg:flex-1 ${
            errors.email
              ? 'border-red focus:border-red'
              : 'focus:border-primary'
          }`}
        />
        <div className='mt-[3px] h-4'>
          {errors.email && (
            <p className='text-red text-xs'>{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Text Area */}
      <div>
        <div className=''>
          <label
            htmlFor='message'
            className='text-gray-dark mb-1 ml-1 block text-sm'
          >
            Your message *
          </label>
        </div>
        <textarea
          placeholder='Write your message here...'
          rows='4'
          name='message'
          {...register('message')}
          className={`textarea textarea-bordered text-stone w-full cursor-pointer p-2 pl-3 text-base placeholder:text-base focus:outline-none ${
            errors.message
              ? 'border-red-500 focus:border-red-500'
              : 'focus:border-primary'
          }`}
        ></textarea>
        <div className='h-4'>
          {errors.message && (
            <p className='text-red text-xs'>{errors.message.message}</p>
          )}
        </div>
      </div>

      {/* Checkbox */}
      <div>
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            name='agreeToPolicies'
            {...register('agreeToPolicies')}
            className='checkbox checkbox-sm checkbox-aloe'
          />
          <label htmlFor='checkbox'>
            <span className='text-stone'>I agree with the&nbsp;</span>
            <Link to='/terms' className='text-accent font-semibold underline'>
              terms and conditions
            </Link>
          </label>
        </div>
        <div className='mt-[3px] h-4'>
          {errors.agreeToPolicies && (
            <p className='text-red text-xs'>{errors.agreeToPolicies.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button type='submit' disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Send your message'}
      </Button>
    </form>
  );
}
