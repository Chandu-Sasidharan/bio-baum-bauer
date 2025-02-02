import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';

const fetchImpressions = async () => {
  const response = await axios.get('/api/impressions');
  return response.data.impressions;
};

export default function useImpressions() {
  const {
    data: impressions,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['impressions'], queryFn: fetchImpressions });

  return { impressions, isLoading, isError };
}
