import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useLanguage } from '@/context/lang-context';

const fetchImpressions = async ({ queryKey }) => {
  const [, locale] = queryKey;
  const response = await axios.get('/api/impressions', {
    params: { lang: locale },
  });
  return response.data.impressions;
};

export default function useImpressions() {
  const { language } = useLanguage();
  const {
    data: impressions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['impressions', language],
    queryFn: fetchImpressions,
  });

  return { impressions, isLoading, isError };
}
