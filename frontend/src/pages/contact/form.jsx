import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from '@/utils/axios';
import Button from '@/components/elements/button';

// Define schema with zod
const schema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'First name should have a minimum length of 3' })
    .max(50, { message: 'First name should have a maximum length of 50' }),
  lastName: z
    .string()
    .min(3, { message: 'Last name should have a minimum length of 3' })
    .max(50, { message: 'Last name should have a maximum length of 50' }),
  emailAddress: z
    .string()
    .email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(1, { message: 'Message is required' }),
  agreeToPolicies: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const onSubmit = async formData => {
    try {
      await axios.post('/api/contact', formData);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form
      className='flex w-full flex-col gap-1'
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* First Name */}
      <div>
        <label
          htmlFor='firstName'
          className='text-primary-dark mb-1 ml-1 block text-sm'
        >
          First Name *
        </label>
        <input
          name='firstName'
          type='text'
          placeholder='Your first name'
          {...register('firstName')}
          className={`input input-bordered w-full cursor-pointer focus:outline-none lg:flex-1 ${
            errors.firstName
              ? 'border-red focus:border-red'
              : 'focus:border-primary'
          }`}
        />
        <div className='mt-[3px] h-4'>
          {errors.firstName && (
            <p className='text-red text-xs'>{errors.firstName.message}</p>
          )}
        </div>
      </div>

      {/* Last Name */}
      <div>
        <label
          htmlFor='lastName'
          className='text-primary-dark mb-1 ml-1 block text-sm'
        >
          Last Name *
        </label>
        <input
          type='text'
          name='lastName'
          placeholder='Your last name'
          {...register('lastName')}
          className={`input input-bordered w-full cursor-pointer focus:outline-none lg:flex-1 ${
            errors.lastName
              ? 'border-red focus:border-red'
              : 'focus:border-primary'
          }`}
        />
        <div className='mt-[3px] h-4'>
          {errors.lastName && (
            <p className='text-red text-xs'>{errors.lastName.message}</p>
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
          name='emailAddress'
          placeholder='email@example.com'
          {...register('emailAddress')}
          className={`input input-bordered w-full cursor-pointer focus:outline-none lg:flex-1 ${
            errors.emailAddress
              ? 'border-red focus:border-red'
              : 'focus:border-primary'
          }`}
        />
        <div className='mt-[3px] h-4'>
          {errors.emailAddress && (
            <p className='text-red text-xs'>{errors.emailAddress.message}</p>
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
          className={`textarea textarea-bordered text-gray-dark w-full cursor-pointer p-2 pl-3 text-base placeholder:text-base focus:outline-none ${
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
      <Button type='submit'>send your message</Button>
    </form>
  );
}
