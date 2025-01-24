/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import backgroundImage from '../../assets/images/leaves_background_01.webp';
import DashboardLinks from '../../components/DashboardLinks';
import MobileDashboardLinks from '../../components/MobileDashboardLinks';
import axios from '@/utils/axios';
import logoIcon from '../../assets/tree.png';
import DashboardHeader from './DashboardHeader';
import { FaRegFilePdf } from 'react-icons/fa6';
import { MdEuroSymbol } from 'react-icons/md';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
const SponsorShipDetails = () => {
  document.title = 'Sponsorship details';
  const { id } = useParams();
  const [sponsorship, setSponsorship] = useState({});
  const [sItems, setSItems] = useState([]);
  const [patron, setPatron] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const getItems = sId => {
      try {
        axios
          .get(`/api/payment/getDetail/${sId}`)
          .then(response => {
            console.log('RESPONSE:', response.data);
            if (response.status === 200) {
              setSponsorship(response.data.sponsorship);
              setSItems(response.data.items);
              setPatron(response.data.patron);
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
    getItems(id);
  }, []);
  return (
    <div className='cart-page-container bg-gray-light relative mx-auto flex w-full items-center justify-center p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px]'>
      {/* Overlay with background image and opacity */}
      <div
        className='cart-page-bg absolute left-0 top-0 hidden h-full w-full bg-contain bg-top bg-no-repeat lg:block'
        style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.6 }}
      ></div>

      <div className='xs:p-2 w-[100%] rounded-[15px] bg-white p-6 shadow-lg md:p-4 lg:mt-[100px] lg:w-[100%] lg:p-8 xl:mt-[120px] xl:w-[80%]'>
        <DashboardHeader subtitle={`sponsorships details`} />
        <MobileDashboardLinks />
        <div className='mt-4 flex flex-col gap-[1rem] md:flex-row md:gap-[2rem]'>
          {/* Dashboard Links */}
          {/* <DashboardLinks /> */}
          {/* Sponsorships */}
          <div className='w-[100%]'>
            <div className='mb-4 flex items-center justify-between'>
              <div className='flex items-center'>
                <img
                  src={logoIcon}
                  alt='Tree Icon'
                  className='mr-2 h-[30px] w-[30px]'
                />
                <h3 className='text-accent font-chicle border-primary inline-block border-b-2 text-3xl tracking-wide'>
                  <span>
                    <span className='hidden md:inline'>Sponsorship's</span>{' '}
                    Details
                  </span>
                </h3>
              </div>
              <Link
                to='/user_sponsorships'
                className='bg-primary text-stone hover:bg-primary-light duration-4000 flex w-max items-center justify-center gap-2 rounded-md border-2 px-4 py-2 transition ease-linear sm:mt-0'
                aria-label='Sponsor Tree page'
              >
                <RiArrowGoBackLine />
                <span>Back to List</span>
              </Link>
            </div>
            <div className='min-h-screen w-[100%] items-center justify-center bg-white'>
              <div className='w-[100] px-0'>
                {error ? (
                  <span className='text-red-500'>{error}</span>
                ) : (
                  <span></span>
                )}
                <div className='overflow-x-auto'>
                  <table className='w-[100%] min-w-max table-auto rounded-br-md rounded-tl-lg border border-white text-left shadow-md'>
                    <thead className='space-y-4 pb-10'>
                      <tr className='bg-primary'>
                        <th className='border-blue-gray-100 bg-blue-gray-50/50 g-3 space-y-2 p-4'>
                          <p className='lg:text-md text-accent block font-sans text-xs font-normal leading-none antialiased opacity-70 xl:text-xl'>
                            Certification No.
                          </p>
                        </th>
                        <th className='border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                          <p className='lg:text-md text-accent block font-sans text-xs font-normal leading-none antialiased opacity-70 xl:text-xl'>
                            Amount
                          </p>
                        </th>
                        <th className='border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                          <p className='lg:text-md text-accent block font-sans text-xs font-normal leading-none antialiased opacity-70 xl:text-xl'>
                            Date
                          </p>
                        </th>
                        <th className='border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                          <p className='lg:text-md text-accent block font-sans text-xs font-normal leading-none antialiased opacity-70 xl:text-xl'>
                            Certificate
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(sponsorship).length > 0 ? (
                        <tr className='hover:bg-primary-light active:bg-bg-primary-light focus:bg-bg-primary-light rounded'>
                          <td className='border-blue-gray-10 border-b p-4'>
                            <p className='text-1xl text-accent block font-sans leading-normal antialiased'>
                              {sponsorship.certificationNo}
                            </p>
                          </td>
                          <td className='border-blue-gray-10 border-b p-4'>
                            <p className='justify-left lg:text-md text-accent flex items-center font-sans text-xs font-normal leading-normal antialiased xl:text-xl'>
                              <span>{sponsorship.amount.$numberDecimal}</span>
                              <MdEuroSymbol />
                            </p>
                          </td>
                          <td className='border-blue-gray-10 border-b p-4'>
                            <div className='w-max'>
                              <div
                                className='text-accent lg:text-md relative grid select-none items-center whitespace-nowrap rounded-md px-2 font-sans text-xs uppercase xl:text-xl'
                                style={{ opacity: 1 }}
                              >
                                <p className='text-accent'>
                                  {new Date(
                                    sponsorship.createdAt
                                  ).toDateString()}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className='border-blue-gray-50 border-b p-4'>
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
                        </tr>
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <br />
                <div className='mx-auto mb-8 w-full px-4 pt-5'>
                  {Object.keys(patron).length > 0 ? (
                    <div className='w-[100%]'>
                      <h3 className='text-accent font-chicle border-primary inline-block break-all border-b-2 text-2xl tracking-wide lg:text-3xl'>
                        Patron Details
                      </h3>
                      <div className='border-primary md:text-md mt-4 flex flex-col items-start justify-center gap-[0.4rem] break-all rounded-[10px] bg-white text-xs sm:text-sm lg:text-lg xl:text-xl'>
                        <p className='text-stone'>
                          <span className='font-semibold'>Full Name:</span>
                          &nbsp;
                          {patron.firstName}&nbsp;{patron.lastName}
                        </p>
                        <p className='text-stone'>
                          <span className='font-semibold'>Email:</span>
                          &nbsp;{patron.email}
                        </p>
                        <p className='text-stone'>
                          <span className='font-semibold'>Phone Number:</span>
                          &nbsp;
                          {patron.mobilePhone}
                        </p>
                        <p className='text-stone'>
                          <span className='font-semibold'>Address Line 1:</span>
                          &nbsp;
                          {patron.address.address1}
                        </p>
                        <p className='text-stone'>
                          <span className='font-semibold'>Address Detail:</span>
                          &nbsp;
                          {patron.address.address2}
                        </p>
                        <p className='text-stone'>
                          <span className='font-semibold'>City:</span>&nbsp;
                          {patron.address.city}
                        </p>
                        <p className='text-stone'>
                          <span className='font-semibold'>Postcode:</span>&nbsp;
                          {patron.address.zipCode}
                        </p>
                        <p className='text-stone'>
                          <span className='font-semibold'>State:</span>&nbsp;
                          {patron.address.state}
                        </p>
                        <p className='text-stone'>
                          <span className='font-semibold'>Country:</span>&nbsp;
                          {patron.address.country}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>
                <hr />
                <br />
                <h3 className='text-accent font-chicle border-primary inline-block break-all border-b-2 text-2xl tracking-wide xl:text-3xl'>
                  Items
                </h3>
                <br /> <br />
                <div className='overflow-x-auto'>
                  <table className='w-[100%] min-w-max table-auto rounded-br-md rounded-tl-lg border border-white text-left shadow-md'>
                    <thead className='space-y-4 pb-10'>
                      <tr className='bg-primary'>
                        <th className='border-blue-gray-100 bg-blue-gray-50/50 g-3 space-y-2 p-4'>
                          <p className='lg:text-md text-accent block font-sans text-xs font-normal leading-none antialiased opacity-70 xl:text-xl'>
                            Image
                          </p>
                        </th>
                        <th className='border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                          <p className='lg:text-md text-accent block font-sans text-xs font-normal leading-none antialiased opacity-70 xl:text-xl'>
                            Name
                          </p>
                        </th>
                        <th className='border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                          <p className='lg:text-md text-accent block font-sans text-xs font-normal leading-none antialiased opacity-70 xl:text-xl'>
                            Price
                          </p>
                        </th>
                        <th className='border-blue-gray-100 bg-blue-gray-50/50 p-4'>
                          <p className='lg:text-md text-accent block font-sans text-xs font-normal leading-none antialiased opacity-70 xl:text-xl'>
                            Quantity
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sItems.map(item => {
                        return (
                          <tr
                            key={item._id}
                            className='hover:bg-primary-light active:bg-bg-primary-light focus:bg-bg-primary-light w-full rounded'
                          >
                            <td className='border-blue-gray-10 border-b p-4'>
                              <img
                                src={item.treeImage}
                                alt='Sapling Tree'
                                className='w-[100px] border border-[var(--primary-dark)]'
                              />
                            </td>
                            <td className='border-blue-gray-10 border-b p-4'>
                              <div className='w-max'>
                                <div
                                  className='text-accent lg:text-md relative grid select-none items-center whitespace-nowrap rounded-md px-2 font-sans text-xs uppercase xl:text-xl'
                                  style={{ opacity: 1 }}
                                >
                                  <p className='text-accent'>{item.treeName}</p>
                                </div>
                              </div>
                            </td>
                            <td className='border-blue-gray-10 border-b p-4'>
                              <p className='justify-left lg:text-md text-accent flex items-center font-sans text-xs font-normal leading-normal antialiased xl:text-xl'>
                                <span>{item.treePrice.$numberDecimal}</span>
                                <MdEuroSymbol />
                              </p>
                            </td>
                            <td className='border-blue-gray-50 border-b p-4'>
                              <div className='flex items-center gap-3'>
                                <span>{item.qty}</span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SponsorShipDetails;
