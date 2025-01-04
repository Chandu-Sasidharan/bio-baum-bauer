import { useContext, useEffect, useState } from 'react';
import DashboardLinks from '../../components/DashboardLinks';
import MobileDashboardLinks from '../../components/MobileDashboardLinks';
import backgroundImage from '../../assets/images/leaves_background_01.webp';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import { AuthContext } from '@/store/auth-context';
import axios from '../../utils/axiosInstance';
import DashboardHeader from './DashboardHeader';
import treePng from '../../assets/tree.png';

const DashboardContent = () => {
  document.title = 'Dashboard - User';
  const { authUser } = useContext(AuthContext);
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
  return (
    <div>
      <PageBreadcrumb activeLinks={aLinkValues} deActiveLink={daLinkValues} />
      <div className='cart-page-container bg-gray-light relative w-full mx-auto p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px] flex items-center justify-center text-stone'>
        {/* Overlay with background image and opacity */}
        <div
          className='cart-page-bg hidden lg:block absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat bg-top'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.6 }}
        ></div>

        <div className='w-full lg:w-[90%] xl:w-[80%] bg-white rounded-[15px] p-6 md:p-4 lg:p-8 shadow-lg  lg:mt-[100px] xl:mt-[120px]'>
          <DashboardHeader subtitle={`main`} />
          <MobileDashboardLinks />
          <div className='flex flex-col md:flex-row mt-4 gap-[1rem] lg:gap-[2rem]'>
            {/* Dashboard Links */}
            <DashboardLinks />
            {/* Sponsorships */}
            <div className='w-full md:w-[25%]'>
              <h3 className='break-all text-2xl md:text-3xl text-accent font-chicle tracking-wide md:border-b-2 md:border-primary inline-block'>
                <span>Hi,</span>
                <span className=' text-gray-dark'>
                  <span className=' inline-block md:hidden lg:inline-block'>
                    &nbsp;{authUser.firstName}
                  </span>
                  &nbsp;{authUser.lastName}
                </span>
              </h3>
              <div className='flex flex-col justify-center items-center gap-[2rem] bg-gray-light rounded-md  mt-4 p-4'>
                <h3 className='text-3xl text-accent font-chicle tracking-wide'>
                  Sponsorships
                </h3>
                <p className='text-red-500'>{error ? error : ''}</p>
                <div className='w-24 h-24 md:w-20 md:h-20 bg-accent rounded-full flex items-center justify-center'>
                  <p className='text-white text-4xl font-chicle'>
                    {sponsorshipsCount}
                  </p>
                </div>
                <Link
                  to='/user_sponsorships'
                  className='underline hover:scale-110 transition-transform duration-400 ease-linear hover:text-gray-dark'
                >
                  <img
                    src={treePng}
                    alt='Tree Icon'
                    className='w-[30px] h-[30px] block mx-auto'
                  />
                  View Sponsorships
                </Link>
              </div>
            </div>{' '}
            {/* Delivery Address */}
            <div className='w-full md:w-[45%]'>
              <h3 className='break-all text-3xl text-accent font-chicle tracking-wide border-b-2 border-primary inline-block'>
                User Details
              </h3>
              <div className=' break-all flex flex-col bg-gray-light justify-center items-start gap-[0.4rem] rounded-md mt-4 p-4'>
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
