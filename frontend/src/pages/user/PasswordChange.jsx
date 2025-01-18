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
  const { authUser, setAuthUser } = useContext(AuthContext);
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
      <div className='cart-page-container bg-gray-light relative mx-auto flex w-full items-center justify-center p-4 pb-[25px] md:pb-[40px] lg:pb-[100px] xl:pb-[120px]'>
        {/* Overlay with background image and opacity */}
        <div
          className='cart-page-bg absolute left-0 top-0 hidden h-full w-full bg-contain bg-top bg-no-repeat lg:block'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.6 }}
        ></div>

        <div className='xs:p-2 w-[100%] rounded-[15px] bg-white p-6 shadow-lg md:p-4 lg:mt-[100px] lg:w-[90%] lg:p-8 xl:mt-[120px] xl:w-[80%]'>
          <DashboardHeader subtitle={`changing password`} />
          <MobileDashboardLinks />
          <div className='mt-4 flex flex-col gap-[1rem] md:flex-row md:gap-[2rem]'>
            {/* Dashboard Links */}
            <DashboardLinks />
            <div className='w-full md:w-[75%]'>
              <div className='mb-4 flex items-center'>
                <img
                  src={treePng}
                  alt='Tree Icon'
                  className='mr-2 h-[30px] w-[30px]'
                />{' '}
                <h3 className='text-accent font-chicle border-primary inline-block border-b-2 text-3xl tracking-wide'>
                  Change Password
                </h3>
              </div>
              {/* change password form */}
              <form onSubmit={handlePasswordChange}>
                <div className='gap:2 mt-10 grid grid-cols-1 lg:gap-4'>
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
                        <HiEyeOff className='text-stone text-2xl' />
                      ) : (
                        <HiEye className='text-stone text-2xl' />
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
                        <HiEyeOff className='text-stone text-2xl' />
                      ) : (
                        <HiEye className='text-stone text-2xl' />
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
                        <HiEyeOff className='text-stone text-2xl' />
                      ) : (
                        <HiEye className='text-stone text-2xl' />
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
                <div className='mb-6 mt-6 flex justify-center text-center'>
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
