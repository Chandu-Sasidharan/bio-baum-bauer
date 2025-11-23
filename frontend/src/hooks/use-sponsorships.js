import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useLanguage } from '@/context/lang-context';

const fetchSponsorships = async ({ queryKey }) => {
  const [, locale] = queryKey;
  const response = await axios.get('/api/sponsorships', {
    params: { lang: locale },
  });
  return response.data.sponsorships;
};

export default function useSponsorships() {
  const { language } = useLanguage();
  const {
    data: sponsorships = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['sponsorships', language],
    queryFn: fetchSponsorships,
  });

  return { sponsorships, isLoading, isError, error, refetch };
}
