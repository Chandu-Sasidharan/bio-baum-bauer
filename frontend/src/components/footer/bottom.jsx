import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    rights: 'Alle Rechte vorbehalten',
  },
  en: {
    rights: 'All Rights Reserved',
  },
};

export default function Bottom() {
  const text = useCopy(copy);

  return (
    <section className='h-20 bg-primary flex flex-wrap flex-col sm:flex-row space-y-0 items-center justify-center border-t'>
      <span className='text-sm sm:text-base'>&copy; 2025 Bio Baum Bauer</span>
      <span className='sm:block hidden mx-2'>|</span>
      <span className='text-sm sm:text-base'>{text.rights}</span>
    </section>
  );
}
