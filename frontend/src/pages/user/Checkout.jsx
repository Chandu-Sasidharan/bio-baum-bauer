import React, { useState, useEffect, useContext } from 'react';
import backgroundImage from '../../assets/images/leaves_background_01.webp';
import { TextInput, Label } from 'flowbite-react';
import { CartContext } from '@/store/cart-context';
import { AuthContext } from '@/store/auth-context';
import { usePatronContext } from '../../store/PatronContext';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { MdOutlineSummarize } from 'react-icons/md';
import treeIcon1 from '../../assets/tree.png';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { MdFileDownloadDone } from 'react-icons/md';
import { RiUserReceived2Fill } from 'react-icons/ri';
import { ImAddressBook } from 'react-icons/im';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import SponsorList from './SponsorList';

const Checkout = () => {
  document.title = 'Checkout';
  const { cartProducts, getTreeQuantity, getItemTotalPrice } =
    useContext(CartContext);
  const { authUser } = useContext(AuthContext);

  const { newPatron, updateNewPatron } = usePatronContext();

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobilePhone: '',
    address1: '',
    address2: '',
    city: '',
    zipCode: '',
    stateCountry: '',
    country: '',
    state: '',
  });

  useEffect(() => {
    // Set formValues based on user data when user data is available
    if (authUser) {
      setFormValues({
        firstName: authUser.firstName || '',
        lastName: authUser.lastName || '',
        email: authUser.email || '',
        mobilePhone: authUser.mobilePhone || '',
        address1: authUser.address?.address1 || '',
        address2: authUser.address?.address2 || '',
        city: authUser.address?.city || '',
        zipCode: authUser.address?.zipCode || '',
        state: authUser.address?.state || '',
        country: authUser.address?.country || 'Germany',
      });
    }
  }, [authUser]);

  useEffect(() => {
    // Update newPatron whenever formValues change
    updateNewPatron({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      mobilePhone: formValues.mobilePhone,
      address: {
        city: formValues.city,
        zipCode: formValues.zipCode,
        country: formValues.country,
        state: formValues.state,
        address1: formValues.address1,
        address2: formValues.address2,
      },
      userId: authUser?._id || '',
    });
  }, [formValues, authUser]);

  // const handleCompleteSponsorship = () => {
  //   // Pass newPatron as a prop
  //   handlePatronInfo({ type: "ADD_PATRON", newPatron: newPatron });
  // };

  return (
    <div>
      {cartProducts && (
        <div className='mt-0 mb-0'>
          <Breadcrumb
            aria-label='This is Breadcrumb showing the location of current page'
            className='bg-gray-50 px-5 py-3 dark:bg-gray-800'
          >
            <Breadcrumb.Item href='/' icon={HiHome}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href='/cart'>Cart</Breadcrumb.Item>
            <Breadcrumb.Item>Checkout</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      )}
      <div className='cart-page-container relative w-full mx-auto flex items-center justify-center p-4 bg-gray-light pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px]  text-stone'>
        {/* Overlay with background image and opacity */}
        <div
          className='cart-page-bg hidden lg:block absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat bg-top'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.2 }}
        ></div>

        <div className='w-full xl:w-[90%] 2xl:w-[80%] bg-white rounded-lg p-3 lg:p-8 shadow-lg lg:mt-[100px] xl:mt-[120px]'>
          <div className='flex flex-col-reverse lg:flex-row gap-[2rem] md:gap-[1rem]'>
            <div className='w-full flex flex-col items-center lg:w-[50%] bg-white gap-[2rem] rounded-md px-2 '>
              {/* Form Fields */}
              <form className='w-full grid grid-cols-1 gap-2 lg:gap-4 mt-3'>
                {/* User Details */}
                <div className='flex items-center justify-start gap-2 mb-4'>
                  <RiUserReceived2Fill size='1.9rem' />
                  <h3 className='text-3xl text-accent font-chicle tracking-wide border-b-2 border-primary inline-block'>
                    Patron Details
                  </h3>
                </div>

                {/* First Name */}
                <div className='mb-4'>
                  <Label htmlFor='firstName' className='visually-hidden'>
                    First Name
                  </Label>
                  <TextInput
                    required
                    id='firstName'
                    name='firstName'
                    placeholder='First Name *'
                    value={
                      formValues.firstName !== undefined
                        ? formValues.firstName
                        : ''
                    }
                    onChange={e =>
                      setFormValues({
                        ...formValues,
                        firstName: e.target.value,
                      })
                    }
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

                {/* Last Name */}
                <div className='mb-4'>
                  <Label htmlFor='lastName' className='visually-hidden'>
                    Last Name
                  </Label>
                  <TextInput
                    required
                    id='lastName'
                    name='lastName'
                    placeholder='Last Name *'
                    value={
                      formValues.lastName !== undefined
                        ? formValues.lastName
                        : ''
                    }
                    onChange={e =>
                      setFormValues({ ...formValues, lastName: e.target.value })
                    }
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

                {/* Email Address */}
                <div className='mb-4'>
                  <Label htmlFor='email' className='visually-hidden'>
                    Email Address
                  </Label>
                  <TextInput
                    required
                    id='email'
                    name='email'
                    placeholder='Email Address *'
                    value={
                      formValues.email !== undefined ? formValues.email : ''
                    }
                    onChange={e =>
                      setFormValues({ ...formValues, email: e.target.value })
                    }
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

                {/* Delivery Address Info */}
                <div className='flex items-center mb-4 mt-6 gap-2'>
                  <ImAddressBook size='1.7rem' />
                  <h3 className='text-3xl text-accent font-chicle tracking-wide border-b-2 border-primary inline-block'>
                    Patron Address
                  </h3>
                </div>

                {/* Phone Number */}
                <div className='mb-4'>
                  <Label htmlFor='mobilePhone' className='visually-hidden'>
                    Phone Number
                  </Label>
                  <TextInput
                    required
                    id='mobilePhone'
                    name='mobilePhone'
                    placeholder='Phone Number *'
                    value={
                      formValues.mobilePhone !== undefined
                        ? formValues.mobilePhone
                        : ''
                    }
                    onChange={e =>
                      setFormValues({
                        ...formValues,
                        mobilePhone: e.target.value,
                      })
                    }
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

                {/* Address Line 1 */}
                <div className='mb-4'>
                  <Label htmlFor='address1' className='visually-hidden'>
                    Address Line 1
                  </Label>
                  <TextInput
                    required
                    id='address1'
                    name='address1'
                    placeholder='Address Line 1 *'
                    value={
                      formValues.address1 !== undefined
                        ? formValues.address1
                        : ''
                    }
                    onChange={e =>
                      setFormValues({ ...formValues, address1: e.target.value })
                    }
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

                {/* Address Line 2 */}
                <div className='mb-4'>
                  <Label htmlFor='address2' className='visually-hidden'>
                    Address Line 2
                  </Label>
                  <TextInput
                    id='address2'
                    name='address2'
                    placeholder='Address Line 2'
                    value={
                      formValues.address2 !== undefined
                        ? formValues.address2
                        : ''
                    }
                    onChange={e =>
                      setFormValues({ ...formValues, address2: e.target.value })
                    }
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

                {/* City */}
                <div className='mb-4'>
                  <Label htmlFor='city' className='visually-hidden'>
                    City
                  </Label>
                  <TextInput
                    required
                    id='city'
                    name='city'
                    placeholder='City *'
                    value={formValues.city !== undefined ? formValues.city : ''}
                    onChange={e =>
                      setFormValues({ ...formValues, city: e.target.value })
                    }
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

                {/* Postcode */}
                <div className='mb-4'>
                  <Label htmlFor='zipCode' className='visually-hidden'>
                    Postcode
                  </Label>
                  <TextInput
                    required
                    id='zipCode'
                    name='zipCode'
                    placeholder='Postcode *'
                    value={
                      formValues.zipCode !== undefined ? formValues.zipCode : ''
                    }
                    onChange={e =>
                      setFormValues({ ...formValues, zipCode: e.target.value })
                    }
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

                {/* State/Country */}
                <div className='mb-4'>
                  <Label htmlFor='state' className='visually-hidden'>
                    State/Country
                  </Label>
                  <TextInput
                    id='state'
                    name='state'
                    placeholder='State/Country'
                    value={
                      formValues.state !== undefined ? formValues.state : ''
                    }
                    onChange={e =>
                      setFormValues({ ...formValues, state: e.target.value })
                    }
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

                {/* Country */}
                <div className='mb-4'>
                  <Label htmlFor='country' className='visually-hidden'>
                    Country
                  </Label>
                  <TextInput
                    required
                    id='country'
                    name='country'
                    placeholder='Country *'
                    style={{
                      backgroundColor: 'var(--bg-white)',
                      borderColor: 'var(--primary)',
                      outlineColor: 'var(--accent)',
                      padding: '1.15rem',
                      color: 'var(--stone)',
                      fontSize: '1rem',
                    }}
                    disabled={true}
                    value='Germany'
                  />
                </div>
              </form>
            </div>
            {/* Sponsorship Summary */}
            <div className='w-full flex flex-col items-center lg:w-[50%] bg-white gap-[2rem] rounded-[10px] self-start h-auto mt-2'>
              <div className='flex flex-row items-center mx-auto gap-2 w-full py-2 text-accent '>
                <MdOutlineSummarize size='1.9rem' />
                <h3 className='text-3xl font-chicle'>Sponsorship Summary</h3>
              </div>
              <SponsorList
                cartProducts={cartProducts}
                getTreeQuantity={getTreeQuantity}
                getItemTotalPrice={getItemTotalPrice}
              />

              {/* Horizontal Line */}
              <hr className='w-[70%] mx-auto border-t-2 border-primary my-1' />

              {/* Complete Sponsorship */}
              <Link
                to='/order/place_order'
                className='flex items-center gap-1 text-2xl justify-center w-full px-4 py-5 bg-sage text-white rounded-md hover:bg-aloe hover:text-accent transition duration-4000 ease-linear'
                aria-label='Complete Sponsorship page/Payment'
              >
                <MdFileDownloadDone size='1.6rem' />
                <span>Complete Sponsorship</span>
              </Link>

              {/* Back to Cart */}
              <Link
                to='/cart'
                className='flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary border-2 text-stone rounded-md hover:bg-primary-light transition duration-4000 ease-linear sm:mt-0'
                aria-label='Sponsor Tree page'
              >
                <RiArrowGoBackLine />
                <span>Back to Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
