import { useState, useEffect, useContext } from 'react';
import { TextInput, Label } from 'flowbite-react';
import { CartContext } from '@/context/cart-context';
import { AuthContext } from '@/context/auth-context';
import { usePatronContext } from '@/context/PatronContext';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';
import { MdOutlineSummarize } from 'react-icons/md';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { MdFileDownloadDone } from 'react-icons/md';
import { RiUserReceived2Fill } from 'react-icons/ri';
import { ImAddressBook } from 'react-icons/im';
import { MdOutlineShoppingCartCheckout } from 'react-icons/md';
import SponsorList from '../user/SponsorList';

const Checkout = () => {
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
        <div className='mb-0 mt-0'>
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
      <div className='bg-gray-light text-stone relative z-[4] mx-auto flex w-full items-center justify-center p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px]'>
        {/* Overlay with background image and opacity */}
        <div
          className='absolute left-0 top-0 z-[-1] hidden h-full w-full bg-contain bg-top bg-no-repeat lg:block'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.2 }}
        ></div>

        <div className='w-full rounded-lg bg-white p-3 shadow-lg lg:mt-[100px] lg:p-8 xl:mt-[120px] xl:w-[90%] 2xl:w-[80%]'>
          <div className='flex flex-col-reverse gap-[2rem] md:gap-[1rem] lg:flex-row'>
            <div className='flex w-full flex-col items-center gap-[2rem] rounded-md bg-white px-2 lg:w-[50%]'>
              {/* Form Fields */}
              <form className='mt-3 grid w-full grid-cols-1 gap-2 lg:gap-4'>
                {/* User Details */}
                <div className='mb-4 flex items-center justify-start gap-2'>
                  <RiUserReceived2Fill size='1.9rem' />
                  <h3 className='text-accent font-chicle border-primary inline-block border-b-2 text-3xl tracking-wide'>
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
                <div className='mb-4 mt-6 flex items-center gap-2'>
                  <ImAddressBook size='1.7rem' />
                  <h3 className='text-accent font-chicle border-primary inline-block border-b-2 text-3xl tracking-wide'>
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
            <div className='mt-2 flex h-auto w-full flex-col items-center gap-[2rem] self-start rounded-[10px] bg-white lg:w-[50%]'>
              <div className='text-accent mx-auto flex w-full flex-row items-center gap-2 py-2'>
                <MdOutlineSummarize size='1.9rem' />
                <h3 className='font-chicle text-3xl'>Sponsorship Summary</h3>
              </div>
              <SponsorList
                cartProducts={cartProducts}
                getTreeQuantity={getTreeQuantity}
                getItemTotalPrice={getItemTotalPrice}
              />

              {/* Horizontal Line */}
              <hr className='border-primary mx-auto my-1 w-[70%] border-t-2' />

              {/* Complete Sponsorship */}
              <Link
                to='/order/place_order'
                className='bg-sage hover:bg-aloe hover:text-accent duration-4000 flex w-full items-center justify-center gap-1 rounded-md px-4 py-5 text-2xl text-white transition ease-linear'
                aria-label='Complete Sponsorship page/Payment'
              >
                <MdFileDownloadDone size='1.6rem' />
                <span>Complete Sponsorship</span>
              </Link>

              {/* Back to Cart */}
              <Link
                to='/cart'
                className='bg-primary text-stone hover:bg-primary-light duration-4000 flex w-full items-center justify-center gap-2 rounded-md border-2 px-4 py-2 transition ease-linear sm:mt-0'
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
