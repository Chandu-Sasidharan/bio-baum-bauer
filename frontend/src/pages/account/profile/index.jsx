import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/elements/button';
import ViewMode from '@/pages/account/profile/view-mode';
import EditMode from '@/pages/account/profile/edit-mode';

export default function AccountDetails() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Helmet>
        <title>My Profile | Bio Baum Bauer</title>
      </Helmet>

      <div className='w-full'>
        {/* Profile Header */}
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>My Profile</h2>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            primary={true}
            size='sm'
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </div>

        {/* Profile Details  */}
        {isEditing ? <EditMode setIsEditing={setIsEditing} /> : <ViewMode />}
      </div>
    </>
  );
}
