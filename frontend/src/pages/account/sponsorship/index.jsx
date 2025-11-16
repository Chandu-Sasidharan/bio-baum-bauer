import { Helmet } from 'react-helmet-async';
import Spinner from '@/components/spinner';
import useSponsorships from '@/hooks/use-sponsorships';
import SponsorshipCard from '@/pages/account/sponsorship/sponsorship-card';
import SponsorshipEmptyState from '@/pages/account/sponsorship/sponsorship-empty-state';

export default function Sponsorship() {
  const { sponsorships, isLoading, isError } = useSponsorships();

  return (
    <>
      <Helmet>
        <title>Sponsorships | Bio Baum Bauer</title>
      </Helmet>
      <div className='w-full space-y-6'>
        <div>
          <h2 className='text-2xl font-bold'>My Sponsorships</h2>
          <p className='text-sm text-stone'>
            View the trees you have sponsored, payment status, and contribution
            details.
          </p>
        </div>

        {isLoading && <Spinner height='60' />}

        {isError && !isLoading && (
          <div className='rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
            We could not load your sponsorships right now. Please refresh the
            page or try again later.
          </div>
        )}

        {!isLoading && !isError && !sponsorships.length && (
          <SponsorshipEmptyState />
        )}

        {!isLoading && !isError && sponsorships.length > 0 && (
          <div className='space-y-4'>
            {sponsorships.map(sponsorship => (
              <SponsorshipCard key={sponsorship.id} sponsorship={sponsorship} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
