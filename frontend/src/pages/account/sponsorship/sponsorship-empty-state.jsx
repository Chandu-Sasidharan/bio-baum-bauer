import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    heading: 'Noch keine Patenschaften',
    body: 'Sobald du Bäume unterstützt, erscheinen hier alle Details, damit du deinen Beitrag im Blick behältst.',
  },
  en: {
    heading: 'No sponsorships yet',
    body: 'Once you sponsor trees, the details of each sponsorship will show up here so you can keep track of your impact.',
  },
};

export default function SponsorshipEmptyState() {
  const text = useCopy(copy);

  return (
    <div className='rounded-md border border-dashed border-primary/30 bg-white p-6 text-center shadow-sm'>
      <h3 className='text-xl font-semibold text-primary-dark'>
        {text.heading}
      </h3>
      <p className='mt-2 text-sm text-stone'>
        {text.body}
      </p>
    </div>
  );
}
