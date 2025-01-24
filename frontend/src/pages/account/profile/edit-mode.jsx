import { useState } from 'react';
import { useUser } from '@/context/auth-context';
import Button from '@/components/elements/button';

export default function EditMode({ setIsEditing }) {
  const { authUser, updateUser } = useUser();
  const { firstName, lastName, phoneNumber, address } = authUser;
  const { street, houseNumber, zipCode, city, country } = address;
  const [isProcessing, setIsProcessing] = useState(false);
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

  const handleChange = e => {
    const { name, value } = e.target;
    setUpdatedUser(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = e => {
    const { name, value } = e.target;
    setUpdatedUser(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsProcessing(true);
    await updateUser(updatedUser);
    setIsProcessing(false);
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='text-primary-dark ml-1 inline-block text-sm font-medium'>
          First Name
        </label>
        <input
          type='text'
          name='firstName'
          value={updatedUser.firstName}
          onChange={handleChange}
          className='input input-bordered input-sm mt-1 inline-block w-full p-1 px-2'
        />
      </div>
      <div>
        <label className='text-primary-dark ml-1 inline-block text-sm font-medium'>
          Last Name
        </label>
        <input
          type='text'
          name='lastName'
          value={updatedUser.lastName}
          onChange={handleChange}
          className='input input-bordered input-sm mt-1 inline-block w-full p-1 px-2'
        />
      </div>
      <div>
        <label className='text-primary-dark ml-1 inline-block text-sm font-medium'>
          Phone Number
        </label>
        <input
          type='text'
          name='phoneNumber'
          value={updatedUser.phoneNumber}
          onChange={handleChange}
          className='input input-bordered input-sm mt-1 inline-block w-full p-1 px-2'
        />
      </div>

      {/* Address */}
      <span className='mt-4 inline-block text-sm font-medium'>Address</span>
      <div className='mt-2 space-y-4'>
        <div className='flex items-center gap-5'>
          <div className='flex w-full flex-col'>
            <label className='text-primary-dark ml-1 inline-block text-xs'>
              Street Name
            </label>
            <input
              type='text'
              name='street'
              value={updatedUser.address.street}
              onChange={handleAddressChange}
              className='input input-bordered input-sm p-1 px-2'
            />
          </div>
          <div className='flex w-full max-w-[200px] flex-col'>
            <label className='text-primary-dark ml-1 inline-block text-xs'>
              House Number
            </label>
            <input
              type='text'
              name='houseNumber'
              value={updatedUser.address.houseNumber}
              onChange={handleAddressChange}
              className='input input-bordered input-sm p-1 px-2'
            />
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <div className='flex w-full max-w-[200px] flex-col'>
            <label className='text-primary-dark ml-1 inline-block text-xs'>
              Postal Code
            </label>
            <input
              type='text'
              name='zipCode'
              value={updatedUser.address.zipCode}
              onChange={handleAddressChange}
              className='input input-bordered input-sm p-1 px-2'
            />
          </div>
          <div className='flex w-full flex-col'>
            <label className='text-primary-dark ml-1 inline-block text-xs'>
              City
            </label>
            <input
              type='text'
              name='city'
              value={updatedUser.address.city}
              onChange={handleAddressChange}
              className='input input-bordered input-sm p-1 px-2'
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <label className='text-primary-dark ml-1 inline-block text-xs'>
            Country
          </label>
          <input
            type='text'
            name='country'
            value={updatedUser.address.country}
            onChange={handleAddressChange}
            className='input input-bordered input-sm p-1 px-2'
          />
        </div>
      </div>
      <Button
        type='submit'
        className='bg-primary mt-4 rounded-md px-4 py-2 text-white'
      >
        {isProcessing ? (
          <span className='loading loading-spinner loading-xs'></span>
        ) : (
          'Save'
        )}
      </Button>
    </form>
  );
}
