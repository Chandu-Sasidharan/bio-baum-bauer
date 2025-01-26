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
import axios from '@/utils/axios';
import { AuthContext } from '@/context/auth-context';
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
      <div className='bg-gray-light relative z-[4] mx-auto flex w-full items-center justify-center p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px]'>
        {/* Overlay with background image and opacity */}
        <div
          className='absolute left-0 top-0 z-[-1] hidden h-full w-full bg-contain bg-top bg-no-repeat lg:block'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.6 }}
        ></div>

        <div className='w-[100%] rounded-[15px] bg-white p-6 shadow-lg md:p-4 lg:mt-[100px] lg:w-[90%] lg:p-8 xl:mt-[120px] xl:w-[80%]'>
          <DashboardHeader subtitle={`sponsorships`} />
          <MobileDashboardLinks />
          <div className='mt-4 flex flex-col gap-[1rem] md:flex-row md:gap-[2rem]'>
            {/* Dashboard Links */}
            <DashboardLinks />

            {/* Sponsorships */}
            <div className='w-full md:w-[75%]'>
              <div className='mb-4 flex items-center'>
                <img
                  src={logoIcon}
                  alt='Tree Icon'
                  className='mr-2 h-[30px] w-[30px]'
                />
                <h3 className='text-accent font-chicle border-primary inline-block border-b-2 text-3xl tracking-wide'>
                  Your Sponsorships
                </h3>
              </div>
              <div className='min-h-screen w-full items-center justify-center bg-white'>
                <div className='w-full overflow-x-auto'>
                  {error ? (
                    <div className='text-red-500'>{error}</div>
                  ) : (
                    <div></div>
                  )}

                  <table className='w-[100%] min-w-max table-auto rounded-br-md rounded-tl-lg border border-white text-left shadow-md'>
                    <thead className='h-10 space-y-4 pb-10 lg:h-20'>
                      <tr className='bg-primary h-30 flex w-full justify-between'>
                        <th className='border-blue-gray-100 bg-blue-gray-50/50 g-3 h-30 space-y-4 p-4'>
                          <p className='lg:text-md text-accent block font-sans text-xs font-normal leading-none antialiased opacity-70 xl:text-xl'>
                            Certification No.
                          </p>
                        </th>
                        <th className='border-blue-gray-100 bg-blue-gray-50/50 hidden p-4 md:inline'>
                          <p className='lg:text-md text-accent block font-sans text-xs font-normal leading-none antialiased opacity-70 xl:text-xl'>
                            Amount
                          </p>
                        </th>
                        <th className='border-blue-gray-100 bg-blue-gray-50/50 hidden p-4 lg:inline'>
                          <p className='lg:text-md text-accent block font-sans text-xs font-normal leading-none antialiased opacity-70 xl:text-xl'>
                            Date
                          </p>
                        </th>
                        <th className='border-blue-gray-100 bg-blue-gray-50/50 hidden p-4 lg:inline'>
                          <p className='lg:text-md text-accent block font-sans text-xs font-normal leading-none antialiased opacity-70 xl:text-xl'>
                            Certificate
                          </p>
                        </th>
                        <th className='border-blue-gray-100 bg-blue-gray-100 p-4'>
                          <p className='lg:text-md text-accent block font-sans text-xs font-normal leading-none antialiased opacity-70 xl:text-xl'>
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
                            className='hover:bg-primary-light active:bg-bg-primary-light focus:bg-bg-primary-light flex h-20 justify-between rounded lg:h-40'
                          >
                            <td className='border-blue-gray-10 border-b p-4'>
                              <p className='lg:text-md text-accent block font-sans text-xs leading-normal antialiased xl:text-xl'>
                                {e.certificationNo}
                              </p>
                            </td>
                            <td className='border-blue-gray-10 hidden border-b p-4 md:inline'>
                              <p className='justify-left lg:text-md text-accent flex items-center font-sans text-xs font-normal leading-normal antialiased xl:text-xl'>
                                <span>{e.amount.$numberDecimal}</span>
                                <MdEuroSymbol />
                              </p>
                            </td>
                            <td className='border-blue-gray-10 hidden border-b p-4 lg:inline'>
                              <div className='w-max'>
                                <div
                                  className='text-accent lg:text-md relative grid select-none items-center whitespace-nowrap rounded-md px-2 font-sans text-xs uppercase xl:text-xl'
                                  style={{ opacity: 1 }}
                                >
                                  <p className='text-accent'>
                                    {new Date(e.createdAt).toDateString()}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className='border-blue-gray-50 hidden border-b p-4 lg:inline'>
                              <div className='flex items-center gap-3'>
                                <FaRegFilePdf className='text-accent text-2xl' />
                                <div className='flex flex-col'>
                                  <p className='text-blue-gray-900 block font-sans text-sm font-normal capitalize leading-normal antialiased'></p>
                                  <p className='lg:text-md text-accent text-blue-gray-900 block font-sans text-xs font-normal leading-normal antialiased opacity-70 xl:text-xl'>
                                    Download
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className='border-blue-gray-50 border-b p-4'>
                              <Link
                                to={`/sponsorship-details/${e._id}`}
                                className='relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
                                type='button'
                              >
                                <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
                                  <IoIosMore className='text-accent text-2xl' />
                                </span>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <div className='mx-auto mb-8 w-full px-4 pt-5'></div>
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
