export default function EditMode({ updatedUser, setUpdatedUser }) {
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

  return (
    <form className='space-y-4'>
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
    </form>
  );
}
