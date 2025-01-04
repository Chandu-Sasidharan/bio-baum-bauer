import { useState, useEffect, useContext } from 'react';
import DashboardLinks from '../../components/DashboardLinks';
import MobileDashboardLinks from '../../components/MobileDashboardLinks';
import backgroundImage from '../../assets/images/leaves_background_01.webp';
import logoIcon from '../../assets/tree.png';
import { HiHome } from 'react-icons/hi';
import { IoIosMore } from 'react-icons/io';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import { FaRegFilePdf } from 'react-icons/fa6';
import { MdEuroSymbol } from 'react-icons/md';
import axios from '../../utils/axiosInstance';
import { AuthContext } from '@/store/auth-context';
import { Link } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';

const UserSponsorships = () => {
  document.title = 'Sponsorship list';
  const { authUser } = useContext(AuthContext);
  const [sponsorships, setSponsorships] = useState([]);
  const [error, setError] = useState('');

  const aLinkValues = [{ linkTo: '/', linkIcon: HiHome, linkText: 'Home' }];
  const daLinkValues = { linkText: 'Sponsorships' };
  useEffect(() => {
    const getSponsorships = user => {
      try {
        axios
          .get(`/api/payment/getAll/${user._id}`)
          .then(response => {
            if (response.status === 200) {
              setSponsorships(response.data);
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
    getSponsorships(authUser);
  }, []);

  return (
    <main>
      <PageBreadcrumb activeLinks={aLinkValues} deActiveLink={daLinkValues} />
      <div className='cart-page-container relative bg-gray-light w-full mx-auto p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px] flex items-center justify-center'>
        {/* Overlay with background image and opacity */}
        <div
          className='cart-page-bg hidden lg:block absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat bg-top'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.6 }}
        ></div>

        <div className='w-[100%] lg:w-[90%] xl:w-[80%] bg-white rounded-[15px] p-6 md:p-4 lg:p-8 shadow-lg lg:mt-[100px] xl:mt-[120px]'>
          <DashboardHeader subtitle={`sponsorships`} />
          <MobileDashboardLinks />
          <div className='flex flex-col md:flex-row mt-4 gap-[1rem] md:gap-[2rem]'>
            {/* Dashboard Links */}
            <DashboardLinks />

            {/* Sponsorships */}
            <div className='w-full md:w-[75%]'>
              <div className='flex items-center mb-4'>
                <img
                  src={logoIcon}
                  alt='Tree Icon'
                  className='w-[30px] h-[30px] mr-2'
                />
                <h3 className='text-3xl text-accent font-chicle tracking-wide border-b-2 border-primary inline-block'>
                  Your Sponsorships
                </h3>
              </div>
              <div className='w-full min-h-screen items-center justify-center bg-white'>
                <div className='w-full overflow-x-auto'>
                  {error ? (
                    <div className=' text-red-500'>{error}</div>
                  ) : (
                    <div></div>
                  )}

                  <table className='w-[100%] min-w-max table-auto text-left border border-white rounded-tl-lg rounded-br-md shadow-md'>
                    <thead className='pb-10 space-y-4 h-10 lg:h-20'>
                      <tr className='bg-primary h-30 flex justify-between w-full'>
                        <th className='space-y-4 border-blue-gray-100 bg-blue-gray-50/50 p-4 g-3 h-30'>
                          <p className='block text-xs lg:text-md xl:text-xl antialiased font-sans text-accent font-normal leading-none opacity-70'>
                            Certification No.
                          </p>
                        </th>
                        <th className='hidden md:inline border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                          <p className='block antialiased font-sans text-xs lg:text-md xl:text-xl text-accent font-normal leading-none opacity-70'>
                            Amount
                          </p>
                        </th>
                        <th className='hidden lg:inline border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                          <p className='block antialiased font-sans text-xs lg:text-md xl:text-xl text-accent font-normal leading-none opacity-70'>
                            Date
                          </p>
                        </th>
                        <th className='hidden lg:inline border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                          <p className='block antialiased font-sans text-xs lg:text-md xl:text-xl text-accent font-normal leading-none opacity-70'>
                            Certificate
                          </p>
                        </th>
                        <th className=' border-blue-gray-100 bg-blue-gray-100 p-4'>
                          <p className='block antialiased font-sans text-xs lg:text-md xl:text-xl text-accent font-normal leading-none opacity-70'>
                            details
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sponsorships.map((e, key) => {
                        return (
                          <tr
                            key={key}
                            className='flex justify-between rounded h-20 lg:h-40 hover:bg-primary-light active:bg-bg-primary-light focus:bg-bg-primary-light'
                          >
                            <td className='p-4 border-b border-blue-gray-10'>
                              <p className='block antialiased font-sans text-xs lg:text-md xl:text-xl text-accent leading-normal  '>
                                {e.certificationNo}
                              </p>
                            </td>
                            <td className='hidden md:inline p-4 border-b border-blue-gray-10'>
                              <p className='flex items-center justify-left antialiased font-sans text-xs lg:text-md xl:text-xl leading-normal text-accent font-normal'>
                                <span>{e.amount.$numberDecimal}</span>
                                <MdEuroSymbol />
                              </p>
                            </td>
                            <td className='hidden lg:inline p-4 border-b border-blue-gray-10'>
                              <div className='w-max'>
                                <div
                                  className='relative grid items-center font-sans text-accent text-xs lg:text-md xl:text-xl uppercase whitespace-nowrap select-none  px-2  rounded-md'
                                  style={{ opacity: 1 }}
                                >
                                  <p className='text-accent'>
                                    {new Date(e.createdAt).toDateString()}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className='hidden lg:inline p-4 border-b border-blue-gray-50'>
                              <div className='flex items-center gap-3'>
                                <FaRegFilePdf className='text-2xl text-accent' />
                                <div className='flex flex-col'>
                                  <p className='block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize'></p>
                                  <p className='block antialiased font-sans text-xs lg:text-md xl:text-xl text-accent leading-normal text-blue-gray-900 font-normal opacity-70'>
                                    Download
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className='p-4 border-b border-blue-gray-50'>
                              <Link
                                to={`/sponsorship-details/${e._id}`}
                                className='relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20'
                                type='button'
                              >
                                <span className='absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'>
                                  <IoIosMore className='text-2xl text-accent' />
                                </span>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className='w-full pt-5 px-4 mb-8 mx-auto '></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserSponsorships;
