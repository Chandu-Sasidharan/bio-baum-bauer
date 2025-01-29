import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useUser } from '@/context/auth-context';
import Button from '@/components/elements/button';
import ViewMode from '@/pages/account/profile/view-mode';
import EditMode from '@/pages/account/profile/edit-mode';

export default function Profile() {
  const { authUser, updateUser, isUserLoading } = useUser();
  const { firstName, lastName, phoneNumber, address = {} } = authUser || {};
  const { street, houseNumber, zipCode, city, country } = address;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    phoneNumber: phoneNumber || '',
    address: {
      street: street || '',
      houseNumber: houseNumber || '',
      zipCode: zipCode || '',
      city: city || '',
      country: country || '',
    },
  });

  const handleSubmit = async e => {
    await updateUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <>
      <Helmet>
        <title>My Profile | Bio Baum Bauer</title>
      </Helmet>

      <div className='w-full'>
        {/* Profile Header */}
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>My Profile</h2>
          <div className='flex items-center gap-2'>
            {isEditing && (
              <Button
                onClick={handleSubmit}
                size='sm'
                className='bg-primary mt-4 rounded-md px-4 py-2 text-white'
                isProcessing={isUserLoading}
              >
                Save
              </Button>
            )}

            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant='primary'
              size='sm'
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </div>

        {/* Profile Details  */}
        {isEditing ? (
          <EditMode updatedUser={updatedUser} setUpdatedUser={setUpdatedUser} />
        ) : (
          <ViewMode />
        )}
      </div>
    </>
  );
}
