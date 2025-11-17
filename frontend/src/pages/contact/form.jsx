import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from '@/utils/axios';
import Button from '@/components/ui/button';
import showAlert from '@/utils/alert';
import formatError from '@/utils/format-error';
import useCopy from '@/hooks/use-copy';
import useLocalizedPath from '@/hooks/use-localized-path';

const copy = {
  de: {
    labels: {
      name: 'Name *',
      email: 'E-Mail-Adresse *',
      message: 'Deine Nachricht *',
      checkbox: 'Ich stimme den',
      checkboxSuffix: 'zu',
    },
    placeholders: {
      name: 'Dein Name',
      email: 'email@example.com',
      message: 'Schreibe deine Nachricht...',
    },
    button: {
      idle: 'Nachricht senden',
      processing: 'Wird gesendet...',
    },
    errors: {
      nameMin: 'Der Name muss mindestens 3 Zeichen lang sein.',
      nameMax: 'Der Name darf höchstens 50 Zeichen lang sein.',
      email: 'Bitte eine gültige E-Mail-Adresse eingeben.',
      message: 'Bitte gib eine Nachricht ein.',
      policies: 'Bitte stimme den AGB zu.',
      default: 'Etwas ist schiefgelaufen.',
    },
    alert: {
      successTitle: 'Vielen Dank!',
      errorTitle: 'Nachricht nicht gesendet',
    },
    checkboxLink: 'Allgemeinen Geschäftsbedingungen',
  },
  en: {
    labels: {
      name: 'Name *',
      email: 'Email Address *',
      message: 'Your message *',
      checkbox: 'I agree with the',
      checkboxSuffix: 'terms and conditions',
    },
    placeholders: {
      name: 'Your name',
      email: 'email@example.com',
      message: 'Write your message here...',
    },
    button: {
      idle: 'Send your message',
      processing: 'Processing...',
    },
    errors: {
      nameMin: 'Name should have a minimum length of 3',
      nameMax: 'Name should have a maximum length of 50',
      email: 'Please enter a valid email address.',
      message: 'Message is required',
      policies: 'Please agree to the terms and conditions',
      default: 'Something went wrong!',
    },
    alert: {
      successTitle: 'Thank you!',
      errorTitle: 'Message Failed',
    },
    checkboxLink: 'terms and conditions',
  },
};

const createSchema = texts =>
  z.object({
    userName: z
      .string()
      .min(3, { message: texts.errors.nameMin })
      .max(50, { message: texts.errors.nameMax }),
    email: z.string().email({ message: texts.errors.email }),
    message: z.string().min(1, { message: texts.errors.message }),
    agreeToPolicies: z.boolean().refine(val => val === true, {
      message: texts.errors.policies,
    }),
  });

export default function Form() {
  const text = useCopy(copy);
  const schema = useMemo(() => createSchema(text), [text]);
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
  const { buildPath } = useLocalizedPath();

  const onSubmit = async formData => {
    setIsProcessing(true);
    try {
      const response = await axios.post('/api/contact/create', formData);

      if (response.status === 201) {
        showAlert('success', text.alert.successTitle, response.data.message);
        // Clear the form
        reset();
      } else {
        // Handle other server response statuses
        showAlert('error', text.alert.errorTitle, response.data.message);
      }
    } catch (error) {
      const errorMessage = formatError(error);
      showAlert(
        'error',
        text.alert.errorTitle,
        null,
        errorMessage || text.errors.default
      );
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
          {text.labels.name}
        </label>
        <input
          type='text'
          name='userName'
          placeholder={text.placeholders.name}
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
          {text.labels.email}
        </label>
        <input
          type='email'
          name='email'
          placeholder={text.placeholders.email}
          {...register('email')}
          className={`input text-stone input-bordered input-light input-light w-full cursor-pointer focus:outline-none lg:flex-1 ${
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
            {text.labels.message}
          </label>
        </div>
        <textarea
          placeholder={text.placeholders.message}
          rows='4'
          name='message'
          {...register('message')}
          className={`textarea textarea-bordered text-stone input-light w-full cursor-pointer p-2 pl-3 text-base placeholder:text-base focus:outline-none ${
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
            className='checkbox checkbox-sm checkbox-aloe input-light'
          />
          <label htmlFor='checkbox'>
            <span className='text-stone'>
              {text.labels.checkbox}&nbsp;
            </span>
            <Link
              to={buildPath('terms')}
              className='text-accent font-semibold underline'
            >
              {text.checkboxLink}
            </Link>
            {text.labels.checkboxSuffix && (
              <span className='text-stone'>&nbsp;{text.labels.checkboxSuffix}</span>
            )}
          </label>
        </div>
        <div className='mt-[3px] h-4'>
          {errors.agreeToPolicies && (
            <p className='text-red text-xs'>{errors.agreeToPolicies.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button type='submit' isProcessing={isProcessing}>
        {isProcessing ? text.button.processing : text.button.idle}
      </Button>
    </form>
  );
}
