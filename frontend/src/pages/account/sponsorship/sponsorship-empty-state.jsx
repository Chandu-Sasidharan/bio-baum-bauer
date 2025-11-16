export default function SponsorshipEmptyState() {
  return (
    <div className='rounded-md border border-dashed border-primary/30 bg-white p-6 text-center shadow-sm'>
      <h3 className='text-xl font-semibold text-primary-dark'>
        No sponsorships yet
      </h3>
      <p className='mt-2 text-sm text-stone'>
        Once you sponsor trees, the details of each sponsorship will show up
        here so you can keep track of your impact.
      </p>
    </div>
  );
}
