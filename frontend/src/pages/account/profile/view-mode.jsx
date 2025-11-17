import { useUser } from '@/context/auth-context';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    labels: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      phoneNumber: 'Telefonnummer',
      address: 'Adresse',
      street: 'Straße',
      houseNumber: 'Hausnummer',
      postalCode: 'Postleitzahl',
      city: 'Stadt',
      country: 'Land',
    },
    fallbacks: {
      firstName: 'Vorname',
      lastName: 'Nachname',
      phoneNumber: 'Telefonnummer',
      street: 'Straße',
      houseNumber: 'Hausnummer',
      postalCode: 'Postleitzahl',
      city: 'Stadt',
      country: 'Land',
    },
  },
  en: {
    labels: {
      firstName: 'First Name',
      lastName: 'Last Name',
      phoneNumber: 'Phone Number',
      address: 'Address',
      street: 'Street Name',
      houseNumber: 'House Number',
      postalCode: 'Postal Code',
      city: 'City',
      country: 'Country',
    },
    fallbacks: {
      firstName: 'First Name',
      lastName: 'Last Name',
      phoneNumber: 'Phone Number',
      street: 'Street Name',
      houseNumber: 'House Number',
      postalCode: 'Zip Code',
      city: 'City',
      country: 'Country',
    },
  },
};

export default function ViewMode() {
  const { authUser } = useUser();
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address = {},
  } = authUser || {};
  const { street, houseNumber, zipCode, city, country } = address;
  const text = useCopy(copy);

  return (
    <>
      <div className='space-y-4'>
        <div>
          <label className='text-primary-dark ml-1 inline-block text-sm font-medium'>
            {text.labels.firstName}
          </label>
          <span className='mt-1 inline-block w-full rounded-md border p-1 px-2'>
            {firstName || text.fallbacks.firstName}
          </span>
        </div>
        <div>
          <label className='text-primary-dark ml-1 inline-block text-sm font-medium'>
            {text.labels.lastName}
          </label>
          <span className='mt-1 inline-block w-full rounded-md border p-1 px-2'>
            {lastName || text.fallbacks.lastName}
          </span>
        </div>
        <div>
          <label className='text-primary-dark ml-1 inline-block text-sm font-medium'>
            {text.labels.phoneNumber}
          </label>
          <span className='mt-1 inline-block w-full rounded-md border p-1 px-2'>
            {phoneNumber || text.fallbacks.phoneNumber}
          </span>
        </div>
      </div>

      {/* Address */}
      <span className='mt-4 inline-block text-sm font-medium'>
        {text.labels.address}
      </span>
      <div className='mt-2 space-y-4'>
        <div className='flex items-center gap-5'>
          <div className='flex w-full flex-col'>
            <label className='text-primary-dark ml-1 inline-block text-xs'>
              {text.labels.street}
            </label>
            <span className='rounded-md border p-1 px-2'>
              {street || text.fallbacks.street}
            </span>
          </div>
          <div className='flex w-full max-w-[200px] flex-col'>
            <label className='text-primary-dark ml-1 inline-block text-xs'>
              {text.labels.houseNumber}
            </label>
            <span className='rounded-md border p-1 px-2'>
              {houseNumber || text.fallbacks.houseNumber}
            </span>
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <div className='flex w-full max-w-[200px] flex-col'>
            <label className='text-primary-dark ml-1 inline-block text-xs'>
              {text.labels.postalCode}
            </label>
            <span className='rounded-md border p-1 px-2'>
              {zipCode || text.fallbacks.postalCode}
            </span>
          </div>
          <div className='flex w-full flex-col'>
            <label className='text-primary-dark ml-1 inline-block text-xs'>
              {text.labels.city}
            </label>
            <span className='rounded-md border p-1 px-2'>
              {city || text.fallbacks.city}
            </span>
          </div>
        </div>
        <div className='flex flex-col'>
          <label className='text-primary-dark ml-1 inline-block text-xs'>
            {text.labels.country}
          </label>
          <span className='rounded-md border p-1 px-2'>
            {country || text.fallbacks.country}
          </span>
        </div>
      </div>
    </>
  );
}
