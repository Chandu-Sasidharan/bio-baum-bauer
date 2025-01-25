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

      <div>
        <div className='flex items-center justify-between'>
          <h2 className='my-4 text-2xl font-bold'>My Profile</h2>
          <div className='flex gap-2'>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              primary={true}
              size='sm'
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          </div>
        </div>

        {isEditing ? <EditMode setIsEditing={setIsEditing} /> : <ViewMode />}
      </div>
    </>
  );
}
