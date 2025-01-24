import { useUser } from '@/context/auth-context';

export default function ViewMode() {
  const { authUser } = useUser();
  const { firstName, lastName, email, phoneNumber, address } = authUser;
  const { street, houseNumber, zipCode, city, country } = address;

  return (
    <>
      <div className='space-y-4'>
        <div>
          <label className='text-primary-dark ml-1 inline-block text-sm font-medium'>
            First Name
          </label>
          <span className='mt-1 inline-block w-full rounded-md border p-1 px-2'>
            {firstName ? firstName : 'Frist Name'}
          </span>
        </div>
        <div>
          <label className='text-primary-dark ml-1 inline-block text-sm font-medium'>
            Last Name
          </label>
          <span className='mt-1 inline-block w-full rounded-md border p-1 px-2'>
            {lastName ? lastName : 'Last Name'}
          </span>
        </div>
        <div>
          <label className='text-primary-dark ml-1 inline-block text-sm font-medium'>
            Email
          </label>
          <span className='mt-1 inline-block w-full rounded-md border p-1 px-2'>
            {email}
          </span>
        </div>
        <div>
          <label className='text-primary-dark ml-1 inline-block text-sm font-medium'>
            Phone Number
          </label>
          <span className='mt-1 inline-block w-full rounded-md border p-1 px-2'>
            {phoneNumber ? phoneNumber : 'Phone Number'}
          </span>
        </div>
      </div>

      {/* Address */}
      <span className='mt-4 inline-block text-sm font-medium'>Address</span>
      <div className='mt-2 space-y-4'>
        <div iv className='flex items-center gap-5'>
          <div className='flex w-full flex-col'>
            <label className='text-primary-dark ml-1 inline-block text-xs'>
              Street Name
            </label>
            <span className='rounded-md border p-1 px-2'>
              {street ? street : 'Street Name'}
            </span>
          </div>
          <div className='flex w-full max-w-[200px] flex-col'>
            <label className='text-primary-dark ml-1 inline-block text-xs'>
              House Number
            </label>
            <span className='rounded-md border p-1 px-2'>
              {houseNumber ? houseNumber : 'House Number'}
            </span>
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <div className='flex w-full max-w-[200px] flex-col'>
            <label className='text-primary-dark ml-1 inline-block text-xs'>
              Postal Code
            </label>
            <span className='rounded-md border p-1 px-2'>
              {zipCode ? zipCode : 'Zip Code'}
            </span>
          </div>
          <div className='flex w-full flex-col'>
            <label className='text-primary-dark ml-1 inline-block text-xs'>
              City
            </label>
            <span className='rounded-md border p-1 px-2'>
              {city ? city : 'City'}
            </span>
          </div>
        </div>
        <div className='flex flex-col'>
          <label className='text-primary-dark ml-1 inline-block text-xs'>
            Country
          </label>
          <span className='rounded-md border p-1 px-2'>
            {country ? country : 'Country'}
          </span>
        </div>
      </div>
    </>
  );
}
