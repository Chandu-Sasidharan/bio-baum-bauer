import { useContext, useState } from 'react';
import { Button, TextInput, Label } from 'flowbite-react';
import DashboardLinks from '../../components/DashboardLinks';
import MobileDashboardLinks from '../../components/MobileDashboardLinks';
import backgroundImage from '../../assets/images/leaves_background_01.webp';
import { HiHome } from 'react-icons/hi';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import { AuthContext } from '@/store/auth-context';
import axios from '../../utils/axiosInstance';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import Swal from 'sweetalert2';
import DashboardHeader from './DashboardHeader';
import { BsSave } from 'react-icons/bs';
import treePng from '../../assets/tree.png';

const PasswordChange = () => {
  document.title = 'Changing Password';
  // State to manage password values
  const { loggedIn, authUser, setAuthUser } = useContext(AuthContext);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handlePasswordChange = async event => {
    event.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = passwords;
    /*  if (newPassword !== confirmNewPassword) {
      alert("New password and confirm password do not match");
      return;
    } */
    try {
      const response = await axios.post(
        `/api/users/chang-password/${authUser._id}`,
        { currentPassword, newPassword, confirmNewPassword }
      );

      // update localStorage
      if (response.status === 200) {
        // Update the user's password in local storage
        console.log('the password changed sunccessfully');
        Swal.fire({
          icon: 'success',
          title: 'The Password changed successfully!',
          text: 'You have successfully changed your password.',
          customClass: {
            confirmButton: 'btn-custom-class',
            title: 'title-class',
          },
          buttonsStyling: false,
        });
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...authUser,
            password: newPassword,
          })
        );

        // Set the new password in the state
        setAuthUser({
          ...authUser,
          password: newPassword,
        });
      }
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      const errorsList = error.response.data.errors
        .map(error => error.msg)
        .join(', ');
      console.log(errorsList);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Change the Password',
        text: errorsList,
        customClass: {
          confirmButton: 'btn-custom-class',
          title: 'title-class',
        },
        buttonsStyling: false,
      });
    }
  };

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmNewPasswordVisibility = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const aLinkValues = [{ linkTo: '/', linkIcon: HiHome, linkText: 'Home' }];
  const daLinkValues = { linkText: 'Change Password' };

  return (
    <div>
      <PageBreadcrumb activeLinks={aLinkValues} deActiveLink={daLinkValues} />
      <div className='cart-page-container relative w-full bg-gray-light mx-auto p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px] flex items-center justify-center'>
        {/* Overlay with background image and opacity */}
        <div
          className='cart-page-bg hidden lg:block absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat bg-top'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.6 }}
        ></div>

        <div className='w-[100%] lg:w-[90%] xl:w-[80%] bg-white rounded-[15px] p-6 xs:p-2 md:p-4 lg:p-8 shadow-lg lg:mt-[100px] xl:mt-[120px]'>
          <DashboardHeader subtitle={`changing password`} />
          <MobileDashboardLinks />
          <div className='flex flex-col md:flex-row mt-4 gap-[1rem] md:gap-[2rem]'>
            {/* Dashboard Links */}
            <DashboardLinks />
            <div className='w-full md:w-[75%]'>
              <div className='flex items-center mb-4'>
                <img
                  src={treePng}
                  alt='Tree Icon'
                  className='w-[30px] h-[30px] mr-2'
                />{' '}
                <h3 className='text-3xl text-accent font-chicle tracking-wide border-b-2 border-primary inline-block'>
                  Change Password
                </h3>
              </div>
              {/* change password form */}
              <form onSubmit={handlePasswordChange}>
                <div className='grid grid-cols-1 gap:2 lg:gap-4 mt-10'>
                  <div className='mb-4' style={{ position: 'relative' }}>
                    <Label
                      htmlFor='currentPassword'
                      className='visually-hidden'
                    >
                      Current Password
                    </Label>
                    <TextInput
                      required
                      id='currentPassword'
                      type={showCurrentPassword ? 'text' : 'password'}
                      placeholder='Current Password *'
                      value={passwords.currentPassword}
                      onChange={e =>
                        setPasswords({
                          ...passwords,
                          currentPassword: e.target.value,
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
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                      }}
                      onClick={toggleCurrentPasswordVisibility}
                    >
                      {showCurrentPassword ? (
                        <HiEyeOff className='text-2xl text-stone' />
                      ) : (
                        <HiEye className='text-2xl text-stone' />
                      )}
                    </div>
                  </div>
                  <div className='mb-4' style={{ position: 'relative' }}>
                    <Label htmlFor='newPassword' className='visually-hidden'>
                      New Password
                    </Label>
                    <TextInput
                      required
                      id='newPassword'
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder='New Password *'
                      value={passwords.newPassword}
                      onChange={e =>
                        setPasswords({
                          ...passwords,
                          newPassword: e.target.value,
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
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                      }}
                      onClick={toggleNewPasswordVisibility}
                    >
                      {showNewPassword ? (
                        <HiEyeOff className='text-2xl text-stone' />
                      ) : (
                        <HiEye className='text-2xl text-stone' />
                      )}
                    </div>
                  </div>
                  <div className='mb-4' style={{ position: 'relative' }}>
                    <Label
                      htmlFor='confirmNewPassword'
                      className='visually-hidden'
                    >
                      Confirm New Password
                    </Label>
                    <TextInput
                      required
                      id='confirmNewPassword'
                      type={showConfirmNewPassword ? 'text' : 'password'}
                      placeholder='Confirm New Password *'
                      value={passwords.confirmNewPassword}
                      onChange={e =>
                        setPasswords({
                          ...passwords,
                          confirmNewPassword: e.target.value,
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
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        right: '10px',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                      }}
                      onClick={toggleConfirmNewPasswordVisibility}
                    >
                      {showConfirmNewPassword ? (
                        <HiEyeOff className='text-2xl text-stone' />
                      ) : (
                        <HiEye className='text-2xl text-stone' />
                      )}
                    </div>
                  </div>
                </div>
                <div className='text-gray-dark'>
                  <p className='font-bold'>Password Requirements:</p>
                  <p>Minimum length of 8 characters</p>
                  <p>At least one number</p>
                  <p>At least one capital letter</p>
                  <p>At least one special symbol</p>
                </div>
                {/* Change Password Button */}
                <div className='text-center flex justify-center mb-6 mt-6'>
                  <Button
                    className='custom-button-style'
                    type='submit'
                    aria-label='Change Password'
                  >
                    <BsSave />
                    <span>&nbsp;&nbsp;Change Password</span>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
