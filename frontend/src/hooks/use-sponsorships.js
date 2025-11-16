import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';

const fetchSponsorships = async () => {
  const response = await axios.get('/api/sponsorships');
  return response.data.sponsorships;
};

export default function useSponsorships() {
  const {
    data: sponsorships = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['sponsorships'],
    queryFn: fetchSponsorships,
  });

  return { sponsorships, isLoading, isError, error, refetch };
}
