import { useContext, useEffect, useState } from 'react';
import DashboardLinks from '../../components/DashboardLinks';
import MobileDashboardLinks from '../../components/MobileDashboardLinks';
import backgroundImage from '../../assets/images/leaves_background_01.webp';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import { AuthContext } from '@/context/auth-context';
import axios from '@/utils/axios';
import DashboardHeader from './DashboardHeader';
import treePng from '../../assets/tree.png';

const DashboardContent = () => {
  document.title = 'Dashboard - User';
  const { authUser, isAuthenticated } = useContext(AuthContext);
  const [sponsorshipsCount, setSponsorshipCount] = useState(0);
  const [error, setError] = useState('');

  const aLinkValues = [{ linkTo: '/', linkIcon: HiHome, linkText: 'Home' }];
  const daLinkValues = { linkText: 'Dashboard' };
  useEffect(() => {
    const getAllSponsorShip = user => {
      try {
        axios
          .get(`/api/payment/getTotalCount/${user._id}`)
          .then(response => {
            if (response.status === 200) {
              setSponsorshipCount(response.data);
            }
          })
          .catch(error => {
            if (error.response.status === 500) {
              setError('Data is not available');
            }
          });
      } catch (error) {
        setError('Server is down!');
      }
    };
    getAllSponsorShip(authUser);
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PageBreadcrumb activeLinks={aLinkValues} deActiveLink={daLinkValues} />
      <div className='bg-gray-light text-stone relative z-[4] mx-auto flex w-full items-center justify-center p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px]'>
        {/* Overlay with background image and opacity */}
        <div
          className='absolute left-0 top-0 z-[-1] hidden h-full w-full bg-contain bg-top bg-no-repeat lg:block'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.6 }}
        ></div>

        <div className='w-full rounded-[15px] bg-white p-6 shadow-lg md:p-4 lg:mt-[100px] lg:w-[90%] lg:p-8 xl:mt-[120px] xl:w-[80%]'>
          <DashboardHeader subtitle={`main`} />
          <MobileDashboardLinks />
          <div className='mt-4 flex flex-col gap-[1rem] md:flex-row lg:gap-[2rem]'>
            {/* Dashboard Links */}
            <DashboardLinks />
            {/* Sponsorships */}
            <div className='w-full md:w-[25%]'>
              <h3 className='text-accent font-chicle md:border-primary inline-block break-all text-2xl tracking-wide md:border-b-2 md:text-3xl'>
                <span>Hi,</span>
                <span className='text-gray-dark'>
                  <span className='inline-block md:hidden lg:inline-block'>
                    &nbsp;{authUser.firstName}
                  </span>
                  &nbsp;{authUser.lastName}
                </span>
              </h3>
              <div className='bg-gray-light mt-4 flex flex-col items-center justify-center gap-[2rem] rounded-md p-4'>
                <h3 className='text-accent font-chicle text-3xl tracking-wide'>
                  Sponsorships
                </h3>
                <p className='text-red-500'>{error ? error : ''}</p>
                <div className='bg-accent flex h-24 w-24 items-center justify-center rounded-full md:h-20 md:w-20'>
                  <p className='font-chicle text-4xl text-white'>
                    {sponsorshipsCount}
                  </p>
                </div>
                <Link
                  to='/user_sponsorships'
                  className='duration-400 hover:text-gray-dark underline transition-transform ease-linear hover:scale-110'
                >
                  <img
                    src={treePng}
                    alt='Tree Icon'
                    className='mx-auto block h-[30px] w-[30px]'
                  />
                  View Sponsorships
                </Link>
              </div>
            </div>{' '}
            {/* Delivery Address */}
            <div className='w-full md:w-[45%]'>
              <h3 className='text-accent font-chicle border-primary inline-block break-all border-b-2 text-3xl tracking-wide'>
                User Details
              </h3>
              <div className='bg-gray-light mt-4 flex flex-col items-start justify-center gap-[0.4rem] break-all rounded-md p-4'>
                <p className='text-stone'>
                  <span className='font-semibold'>Full Name:</span>&nbsp;
                  {authUser.firstName}&nbsp;{authUser.lastName}
                </p>{' '}
                <p className='text-stone'>
                  <span className='font-semibold'>Email:</span>
                  &nbsp;{authUser.email}
                </p>{' '}
                <p className='text-stone'>
                  <span className='font-semibold'>Phone Number:</span>&nbsp;
                  {authUser.mobilePhone}
                </p>{' '}
                <p className='text-stone'>
                  <span className='font-semibold'>Address Line 1:</span>&nbsp;
                  {authUser.address.address1}
                </p>{' '}
                <p className='text-stone'>
                  <span className='font-semibold'>Address Line 2:</span>&nbsp;
                  {authUser.address.address2}
                </p>{' '}
                <p className='text-stone'>
                  <span className='font-semibold'>City:</span>&nbsp;
                  {authUser.address.city}
                </p>{' '}
                <p className='text-stone'>
                  <span className='font-semibold'>Postcode:</span>&nbsp;
                  {authUser.address.zipCode}
                </p>{' '}
                <p className='text-stone'>
                  <span className='font-semibold'>State:</span>&nbsp;
                  {authUser.address.state}
                </p>{' '}
                <p className='text-stone'>
                  <span className='font-semibold'>Country:</span>&nbsp;
                  {authUser.address.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
