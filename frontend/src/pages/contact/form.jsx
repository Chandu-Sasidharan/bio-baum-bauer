import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
// import axios from '@/utils/axios';
import { Label, TextInput, Checkbox, Button, Textarea } from 'flowbite-react';
import { IoMdPerson } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';

export default function Form() {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const checkboxRef = useRef(false);
  const firsNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleCheckboxChange = () => {
    setIsTermsAccepted(checkboxRef.current.checked);
  };

  const handleSubmit = async event => {
    // Do form submission here
  };

  return (
    <form className='flex w-full flex-col gap-4' onSubmit={handleSubmit}>
      <div>
        <div className='mb-2 block'>
          <Label
            htmlFor='firstName'
            value='First Name *'
            className='text-gray-dark text-[1rem]'
          />
        </div>
        <TextInput
          aria-label='Type here your first name'
          id='firstName'
          name='firstName'
          type='text'
          icon={IoMdPerson}
          placeholder='Like: Mice'
          ref={firsNameRef}
          shadow
        />
      </div>
      <div>
        <div className='mb-2 block'>
          <Label
            htmlFor='lastName'
            value='Last Name *'
            className='text-gray-dark text-[1rem]'
          />
        </div>
        <TextInput
          aria-label='Type here your last name'
          id='lastName'
          type='text'
          name='lastName'
          ref={lastNameRef}
          icon={IoMdPerson}
          placeholder='Like: Polocy'
          helperText={
            <span>
              Full Name should look like,&nbsp;
              <span className='rounded-md bg-white px-2 py-1'>Mice Polocy</span>
            </span>
          }
        />
      </div>
      <div>
        <div className='mb-2 block'>
          <Label
            htmlFor='emailAddress'
            value='Email Address *'
            className='text-gray-dark text-[1rem]'
          />
        </div>
        <TextInput
          aria-label='Type here your email address'
          id='emailAddress'
          icon={MdEmail}
          ref={emailRef}
          type='email'
          name='emailAddress'
          placeholder='mice.plocy@gmail.com'
        />
      </div>
      <div className='w-full'>
        <div className='mb-2 block'>
          <Label
            htmlFor='message'
            value='Your message*'
            className='text-gray-dark text-[1rem]'
          />
        </div>
        <Textarea
          aria-label='Type here your your message'
          id='message'
          placeholder='Write your message here...'
          name='message'
          rows={4}
          ref={messageRef}
        />
      </div>
      <div className='flex items-center gap-2'>
        <Checkbox
          id='agree'
          name='agreeToPolicies'
          ref={checkboxRef}
          onChange={handleCheckboxChange}
          className='border-stone checked:bg-accent !important cursor-pointer checked:border-none checked:outline-none focus:ring-transparent dark:ring-offset-transparent'
        />
        <Label htmlFor='agree'>
          <span className='text-stone'>I agree with the&nbsp;</span>
          <Link to='/terms' className='text-accent font-semibold underline'>
            terms and conditions
          </Link>
        </Label>
      </div>
      {isTermsAccepted ? (
        <Button className='custom-button-style' type='submit'>
          send your message
        </Button>
      ) : (
        <Button disabled className='custom-button-style' type='submit'>
          send your message
        </Button>
      )}
    </form>
  );
}
