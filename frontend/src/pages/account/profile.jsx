import { Helmet } from 'react-helmet-async';
import backgroundImage from '/images/background/leaves-background.webp';
import { useUser } from '@/store/auth-context';

export default function AccountDetails() {
  const { authUser } = useUser();

  return (
    <>
      <Helmet>
        <title>My Profile | Bio Baum Bauer</title>
      </Helmet>

      <div className='relative flex flex-col items-center'>
        {/* Overlay with background image and opacity */}
        <div
          className='absolute left-0 top-0 z-[0] h-full w-full bg-cover bg-top bg-no-repeat'
          style={{ backgroundImage: `url(${backgroundImage})`, opacity: 0.2 }}
        ></div>

        {/* Flex Row1 */}
        {/* Flex Row2 */}
        <div className='h-full w-full bg-orange-400'> Hello </div>
      </div>
    </>
  );
}
