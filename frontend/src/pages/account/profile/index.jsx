import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useUser } from '@/context/auth-context';
import Button from '@/components/ui/button';
import ViewMode from '@/pages/account/profile/view-mode';
import EditMode from '@/pages/account/profile/edit-mode';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    metaTitle: 'Mein Profil | Bio Baum Bauer',
    heading: 'Mein Profil',
    actions: {
      save: 'Speichern',
      edit: 'Bearbeiten',
      cancel: 'Abbrechen',
    },
  },
  en: {
    metaTitle: 'My Profile | Bio Baum Bauer',
    heading: 'My Profile',
    actions: {
      save: 'Save',
      edit: 'Edit',
      cancel: 'Cancel',
    },
  },
};

export default function Profile() {
  const { authUser, updateUser, isUserLoading } = useUser();
  const text = useCopy(copy);
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
        <title>{text.metaTitle}</title>
      </Helmet>

      <div className='w-full'>
        {/* Profile Header */}
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>{text.heading}</h2>
          <div className='flex items-center gap-2'>
            {isEditing && (
              <Button
                onClick={handleSubmit}
                size='sm'
                isProcessing={isUserLoading}
              >
                {text.actions.save}
              </Button>
            )}

            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant='primary'
              size='sm'
            >
              {isEditing ? text.actions.cancel : text.actions.edit}
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
