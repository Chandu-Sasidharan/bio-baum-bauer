import { Helmet } from 'react-helmet-async';
import Spinner from '@/components/spinner';
import useSponsorships from '@/hooks/use-sponsorships';
import SponsorshipCard from '@/pages/account/sponsorship/sponsorship-card';
import SponsorshipEmptyState from '@/pages/account/sponsorship/sponsorship-empty-state';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    metaTitle: 'Patenschaften | Bio Baum Bauer',
    heading: 'Meine Patenschaften',
    description:
      'Hier findest du deine gesponserten Bäume, Zahlungsstatus und Beiträge.',
    error:
      'Wir konnten deine Patenschaften gerade nicht laden. Bitte aktualisiere die Seite oder versuche es später erneut.',
  },
  en: {
    metaTitle: 'Sponsorships | Bio Baum Bauer',
    heading: 'My Sponsorships',
    description:
      'View the trees you have sponsored, payment status, and contribution details.',
    error:
      'We could not load your sponsorships right now. Please refresh the page or try again later.',
  },
};

export default function Sponsorship() {
  const { sponsorships, isLoading, isError } = useSponsorships();
  const text = useCopy(copy);

  return (
    <>
      <Helmet>
        <title>{text.metaTitle}</title>
      </Helmet>
      <div className='w-full space-y-6'>
        <div>
          <h2 className='text-2xl font-bold'>{text.heading}</h2>
          <p className='text-sm text-stone'>{text.description}</p>
        </div>

        {isLoading && <Spinner height='60' />}

        {isError && !isLoading && (
          <div className='rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700'>
            {text.error}
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
