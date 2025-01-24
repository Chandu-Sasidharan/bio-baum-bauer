import { useState, useRef } from 'react';
import { Label, TextInput, Checkbox, Button, Textarea } from 'flowbite-react';
import Swal from 'sweetalert2';
import { HiHome } from 'react-icons/hi';
import { IoMdPerson } from 'react-icons/io';
import { MdEmail, MdDoubleArrow } from 'react-icons/md';
import { FaLocationDot, FaYoutube } from 'react-icons/fa6';
import { AiTwotoneMail } from 'react-icons/ai';
import { FaPhoneSquareAlt, FaLinkedin, FaTiktok } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { BsTwitterX } from 'react-icons/bs';
import backgroundImage from '../assets/images/gallery_images/leaves_background_03.png';
import axios from '@/utils/axios';
import EachPageHeader from '../components/EachPageHeader';
import PageBreadcrumb from '../components/PageBreadcrumb';
import treeicon from '../assets/tree.png';

import { Link } from 'react-router-dom';

const Contact = () => {
  document.title = 'Contact US';
  const titles = ['Contact Page', 'Below, our contact details provided!'];
  const titles2 = [
    'Locate Our Green Haven',
    'Finding Us: A Map to Sustainability!',
  ];
  const aLinkValues = [{ linkTo: '/', linkIcon: HiHome, linkText: 'Home' }];
  const daLinkValues = { linkText: 'Contact Page' };

  const [errorMsgs, setErrorMsgs] = useState([]);
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
    event.preventDefault();
    const formData = await new FormData(event.target);

    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      emailAddress: formData.get('emailAddress'),
      message: formData.get('message'),
    };

    if (formData.get('agreeToPolicies')) {
      axios
        .post('/api/contact/create', data)
        .then(response => {
          if (response.status === 201) {
            setErrorMsgs([]);
            Swal.fire({
              icon: 'success',
              title:
                'Thanks for your inquiry, we will provide response for you soon',
              showClass: {
                popup: 'animate__animated animate__fadeInDown',
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
              },
              customClass: {
                confirmButton: 'btn-custom-class',
                title: 'title-class',
              },
              buttonsStyling: false,
            });

            checkboxRef.current.checked = false;
            setIsTermsAccepted(false);
            firsNameRef.current.value = '';
            lastNameRef.current.value = '';
            emailRef.current.value = '';
            messageRef.current.value = '';
          }
        })
        .catch(error => {
          setErrorMsgs([]);
          // Handle errors that occurred during the POST request
          if (error.response.status === 400) {
            setErrorMsgs(error.response.data.errors);
          }
        });
    }
  };

  return (
    <div className='text-stone'>
      <PageBreadcrumb activeLinks={aLinkValues} deActiveLink={daLinkValues} />
      <div className='relative mx-auto flex w-full flex-col items-center justify-center p-4'>
        {/* Overlay with background image and opacity */}
        <div
          className='absolute left-0 top-0 z-[-1] h-full w-full bg-cover bg-bottom bg-no-repeat opacity-20 lg:opacity-75'
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        ></div>
        <EachPageHeader title={titles[0]} subtitle={titles[1]} />
        {/*   <div className="container mx-auto flex justify-center items-center"> */}

        <ul>
          {errorMsgs.map((error, index) => (
            <li
              key={error.path + index}
              className='flex items-center text-red-700'
            >
              <MdDoubleArrow /> <span>&nbsp;{error.msg}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className='bg-primary-light z-9 mx-auto flex w-[95%] flex-col items-start justify-start gap-[2rem] rounded-[15px] p-2 py-4 shadow-lg sm:w-[90%] sm:p-8 lg:w-[80%] xl:w-[80%]'>
        <div className='mx-auto my-4 flex w-[100%] flex-col items-center justify-center gap-[3rem] lg:flex-row xl:w-[90%]'>
          <section className='flex w-full flex-col items-start gap-3 px-3 lg:w-[50%]'>
            <div className='mb-4 flex items-center'>
              <img
                src={treeicon}
                alt='Tree Icon'
                className='mr-2 h-[40px] w-[40px]'
              />{' '}
              <h3 className='text-accent font-chicle border-primary inline-block border-b-2 text-3xl tracking-wide'>
                GET IN TOUCH
              </h3>
            </div>
            <p className='flex w-full flex-row items-center gap-2 rounded-md bg-white p-3 shadow-md hover:rounded-lg hover:shadow-lg'>
              <span className='text-lg'>
                <FaLocationDot />
              </span>
              <span className='text-lg'>
                Schulgasse 9, 74336 Brackenheim, <br /> Baden-Württemberg,
                Germany
              </span>
            </p>
            <p className='flex w-full flex-row items-center gap-1 rounded-md bg-white p-3 shadow-md hover:rounded-lg hover:shadow-lg'>
              <span className='text-lg'>
                <AiTwotoneMail />
              </span>
              <span className='xs:text-xs text-lg'>
                <a
                  href='mailto:hello@biobaumbauer.de'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  hello@biobaumbauer.de
                </a>
              </span>
            </p>
            {0 === 0 ? (
              <span></span>
            ) : (
              <p className='flex w-full flex-row items-center gap-1 rounded-md bg-white p-3 shadow-md hover:rounded-lg hover:shadow-lg'>
                <span className='text-lg'>
                  <FaPhoneSquareAlt />
                </span>
                <span className='text-lg'>+49--------</span>
              </p>
            )}

            <p className='flex w-full flex-row items-center justify-center gap-2 rounded-md bg-white p-4 shadow-md hover:rounded-lg hover:shadow-lg sm:gap-5'>
              <a
                href='http://'
                className='border-stone text-stone hover:bg-stone duration-5000 rounded-full border-2 bg-white p-2 transition ease-linear hover:text-white'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaLinkedin />
              </a>
              <a
                href='http://'
                className='border-stone text-stone hover:bg-stone duration-5000 rounded-full border-2 bg-white p-2 transition ease-linear hover:text-white'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaYoutube />
              </a>
              {0 === 0 ? (
                <></>
              ) : (
                <a
                  href='http://'
                  className='border-stone text-stone hover:bg-stone duration-5000 rounded-full border-2 bg-white p-2 transition ease-linear hover:text-white'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <IoLogoWhatsapp />
                </a>
              )}

              <a
                href='http://'
                className='border-stone text-stone hover:bg-stone duration-5000 rounded-full border-2 bg-white p-2 transition ease-linear hover:text-white'
                target='_blank'
                rel='noopener noreferrer'
              >
                <BsTwitterX />
              </a>
              <a
                href='http://'
                className='border-stone text-stone hover:bg-stone duration-5000 rounded-full border-2 bg-white p-2 transition ease-linear hover:text-white'
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaTiktok />
              </a>
            </p>
          </section>
          <section className='flex w-full flex-row items-center justify-center lg:w-[50%]'>
            <form
              className='flex w-full flex-col gap-4'
              onSubmit={handleSubmit}
            >
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
                  className='input'
                  style={{
                    borderColor: 'var(--primary)',
                    outlineColor: 'var(--accent)',
                    padding: '1.15rem',
                    color: 'var(--stone)',
                    fontSize: '1rem',
                    paddingLeft: '2.5rem',
                  }}
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
                      <span className='rounded-md bg-white px-2 py-1'>
                        Mice Polocy
                      </span>
                    </span>
                  }
                  shadow
                  className='input'
                  style={{
                    borderColor: 'var(--primary)',
                    outlineColor: 'var(--accent)',
                    padding: '1.15rem',
                    color: 'var(--stone)',
                    fontSize: '1rem',
                    paddingLeft: '2.5rem',
                  }}
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
                  shadow
                  className='input'
                  style={{
                    borderColor: 'var(--primary)',
                    outlineColor: 'var(--accent)',
                    padding: '1.15rem',
                    color: 'var(--stone)',
                    fontSize: '1rem',
                    paddingLeft: '2.5rem',
                  }}
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
                  className='input !important focus:border-transparent focus:ring-transparent dark:focus:border-transparent dark:focus:ring-transparent'
                  style={{
                    borderColor: 'var(--primary)',
                    outlineColor: 'var(--accent)',
                    padding: '1.15rem',
                    color: 'var(--stone)',
                    fontSize: '1rem',
                    paddingLeft: '1rem',
                  }}
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
                  <Link
                    to='/terms'
                    className='text-accent font-semibold underline'
                  >
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
          </section>
        </div>
      </div>
      <div className='px-4 text-center'>
        <EachPageHeader title={titles2[0]} subtitle={titles2[1]} />
      </div>
      <div className=''>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.430292021205!2d9.1054661!3d49.078463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47982a23427504e1%3A0xe8756bb1ba92dd7!2sSolawi%20Zaberg%C3%A4u!5e0!3m2!1sen!2sde!4v1709384848796!5m2!1sen!2sde'
          className='h-[650px] w-full rounded-sm border-0'
          allowFullScreen={true}
          loading='lazy'
          aria-label='Here is the map will find the route to the address!'
          referrerPolicy='no-referrer-when-downgrade'
          title='Location Map'
        ></iframe>
      </div>
    </div>
  );
};
export default Contact;
