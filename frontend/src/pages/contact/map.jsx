import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    aria: 'Google Maps Standort von Bio Baum Bauer',
  },
  en: {
    aria: 'Google map showing the Bio Baum Bauer address',
  },
};

export default function LocationMap() {
  const text = useCopy(copy);

  return (
    <div className='w-full'>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.430292021205!2d9.1054661!3d49.078463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47982a23427504e1%3A0xe8756bb1ba92dd7!2sSolawi%20Zaberg%C3%A4u!5e0!3m2!1sen!2sde!4v1709384848796!5m2!1sen!2sde'
        className='borde h-[650px] w-full'
        allowFullScreen={true}
        loading='lazy'
        aria-label={text.aria}
      ></iframe>
    </div>
  );
}
