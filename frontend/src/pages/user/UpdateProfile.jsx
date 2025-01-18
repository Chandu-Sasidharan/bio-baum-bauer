import { useState, useEffect, useContext } from 'react';
import { Button, TextInput, Label } from 'flowbite-react';
import 'sweetalert2/dist/sweetalert2.min.css';
import DashboardLinks from '../../components/DashboardLinks';
import MobileDashboardLinks from '../../components/MobileDashboardLinks';
import backgroundImage from '../../assets/images/leaves_background_01.webp';
import { HiHome } from 'react-icons/hi';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import { AuthContext } from '@/store/auth-context';
import DashboardHeader from './DashboardHeader';
import Swal from 'sweetalert2';
import axios from '../../utils/axiosInstance';
import { BsSave } from 'react-icons/bs';
import treePng from '../../assets/tree.png';

const UpdateProfile = () => {
  const { isAuthenticated, authUser, setAuthUser } = useContext(AuthContext);
  const aLinkValues = [{ linkTo: '/', linkIcon: HiHome, linkText: 'Home' }];
  const daLinkValues = { linkText: 'Update Profile' };

  /*   const [user, setUser] = useState()
  const UId = '65673cc189843980368351b0'
 */

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
    document.title = 'Update Profile';
    // Set formValues based on user data when user data is available

    setFormValues({
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      email: authUser.email,
      mobilePhone: authUser.mobilePhone || '',
      address1: authUser.address.address1 || '',
      address2: authUser.address?.address2 || '',
      city: authUser.address.city,
      zipCode: authUser.address.zipCode || '',
      state: authUser.address.state || '',
      country: authUser.address.country || '',
    });
  }, [authUser]);
  const handleswal = () => {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
      customClass: {
        confirmButton: 'btn-custom-class',
        denyButton: 'btn-deny-class',
        cancelButton: 'btn-cancel-class',
        title: 'title-class',
      },
      buttonsStyling: false,
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Profile updated successfully',
          icon: 'success',
          customClass: {
            confirmButton: 'btn-custom-class',
            title: 'title-class',
          },
          buttonsStyling: false,
        });

        handleUpdate();
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Changes are not saved!',
          icon: 'info',
          customClass: {
            confirmButton: 'btn-custom-class',
            title: 'title-class',
          },
          buttonsStyling: false,
        });
      }
    });
  };

  const handleUpdate = async () => {
    /*     console.log("Form values:", formValues);
    
     */
    // eslint-disable-next-line react-hooks/rules-of-hooks

    try {
      const response = await axios.patch(
        `/api/users/update-by-id/${authUser._id}`,
        formValues
      );

      if (response.status === 200) {
        console.log(response.data);
        setAuthUser(response.data.user);
        setFormValues(response.data);
      }
    } catch (error) {
      console.error('Error updating user profile:', error.message);
      // You can add additional error handling or alert the user about the issue
      console.error('Error details:', error);
    }

    /* const handleInputChange = (fieldName, value) => {
  setFormValues({
    ...formValues,
    [fieldName]: value,
  });
}; */
  };

  return (
    <main>
      <PageBreadcrumb activeLinks={aLinkValues} deActiveLink={daLinkValues} />
      <div className='cart-page-container bg-gray-light relative mx-auto flex w-full items-center justify-center p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px]'>
        {/* Overlay with background image and opacity */}
        <div
          className='cart-page-bg absolute left-0 top-0 hidden h-full w-full bg-contain bg-top bg-no-repeat lg:block'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.6 }}
        ></div>

        <div className='xs:p-2 w-[100%] rounded-[15px] bg-white p-6 shadow-lg md:p-4 lg:mt-[100px] lg:w-[90%] lg:p-8 xl:mt-[120px] xl:w-[80%]'>
          <DashboardHeader subtitle={`update profile`} />
          <MobileDashboardLinks />
          <div className='mt-4 flex flex-col gap-[1rem] md:flex-row md:gap-[2rem]'>
            {/* Dashboard Links */}
            <DashboardLinks />
            {/* Form */}{' '}
            {isAuthenticated && (
              <div className='w-[100%] md:w-[75%]'>
                <div className='mb-4 flex items-center'>
                  <img
                    src={treePng}
                    alt='Tree Icon'
                    className='mr-2 h-[30px] w-[30px]'
                  />{' '}
                  <h3 className='text-accent font-chicle border-primary inline-block border-b-2 text-3xl tracking-wide'>
                    Edit Your Profile
                  </h3>
                </div>
                {/* Form Fields */}
                <div className='mt-10 grid grid-cols-1 gap-2 md:grid-cols-2 lg:gap-4'>
                  {/* First Row */}
                  <div className='mb-4'>
                    <Label htmlFor='firstName' className=''>
                      First Name
                    </Label>
                    <TextInput
                      id='firstName'
                      type='text'
                      value={authUser?.firstName || ' '}
                      disabled={true}
                      readOnly
                      className='input'
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
                  <div className='mb-4'>
                    <Label htmlFor='lastName' className=''>
                      Last Name
                    </Label>
                    <TextInput
                      required
                      id='lastName'
                      type='text'
                      value={authUser?.lastName || ' '}
                      readOnly
                      disabled={true}
                      onChange={
                        e => console.log(e)
                        /*                       handleInputChange("lastName", e.target.value)
                         */
                      }
                      className='input'
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

                  {/* Second Row */}
                  <div className='mb-4'>
                    <Label htmlFor='email' className=''>
                      Email Address
                    </Label>
                    <TextInput
                      required
                      id='email'
                      type='email'
                      value={authUser?.email || ''}
                      readOnly
                      disabled={true}
                      onChange={
                        e =>
                          console.log(
                            e
                          ) /* handleInputChange("email", e.target.value) */
                      }
                      className='input'
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
                  <div className='mb-4'>
                    <Label htmlFor='phoneNumber' className=''>
                      Phone Number *
                    </Label>
                    <TextInput
                      required
                      id='phoneNumber'
                      type='text'
                      name='phone'
                      value={
                        formValues.mobilePhone || ' ' || authUser?.mobilePhone
                      }
                      onChange={e =>
                        setFormValues({
                          ...formValues,
                          mobilePhone: e.target.value,
                        })
                      }
                      className='input'
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

                  {/* Third Row */}
                  <div className='mb-4'>
                    <Label htmlFor='addressLine1' className=''>
                      Address Line 1 *
                    </Label>
                    <TextInput
                      required
                      id='addressLine1'
                      type='text'
                      value={
                        formValues.address1 || ' ' || authUser?.address.address1
                      }
                      onChange={e =>
                        setFormValues({
                          ...formValues,
                          address1: e.target.value,
                        })
                      }
                      className='input'
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
                  <div className='mb-4'>
                    <Label htmlFor='addressLine2' className=''>
                      Address Line 2
                    </Label>
                    <TextInput
                      id='addressLine2'
                      type='text'
                      value={
                        formValues.address2 || ' ' || authUser?.address.address2
                      }
                      onChange={e =>
                        setFormValues({
                          ...formValues,
                          address2: e.target.value,
                        })
                      }
                      className='input'
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

                  {/* Fourth Row */}
                  <div className='mb-4'>
                    <Label htmlFor='city' className=''>
                      City *
                    </Label>
                    <TextInput
                      required
                      id='city'
                      type='text'
                      value={formValues.city || ' ' || authUser?.address.city}
                      onChange={e =>
                        setFormValues({ ...formValues, city: e.target.value })
                      }
                      className='input'
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
                  <div className='mb-4'>
                    <Label htmlFor='postcode' className=''>
                      Postcode *
                    </Label>
                    <TextInput
                      required
                      id='postcode'
                      type='text'
                      value={
                        formValues.zipCode || ' ' || authUser?.address.zipCode
                      }
                      onChange={e =>
                        setFormValues({
                          ...formValues,
                          zipCode: e.target.value,
                        })
                      }
                      className='input'
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

                  {/* Fifth Row */}
                  <div className='mb-4'>
                    <Label htmlFor='stateCountry' className=''>
                      State
                    </Label>
                    <TextInput
                      id='stateCountry'
                      type='text'
                      value={formValues.state || authUser?.address.state}
                      onChange={e =>
                        setFormValues({ ...formValues, state: e.target.value })
                      }
                      className='input'
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
                  <div className='mb-4'>
                    <Label htmlFor='country' className=''>
                      Country *
                    </Label>
                    <TextInput
                      required
                      id='country'
                      type='text'
                      readOnly
                      value={
                        formValues.country || ' ' || authUser?.address.country
                      }
                      onChange={e =>
                        setFormValues({
                          ...formValues,
                          country: e.target.value,
                        })
                      }
                      className='input'
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
                </div>
                {/* Update Button */}
                <div className='mb-6 flex items-center justify-center'>
                  <Button
                    className='custom-button-style'
                    onClick={handleswal}
                    aria-label='Update Profile'
                  >
                    <BsSave />
                    <span>&nbsp;&nbsp;Save Changes</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdateProfile;
