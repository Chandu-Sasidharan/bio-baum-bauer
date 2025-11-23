import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useLanguage } from '@/context/lang-context';

const fetchTrees = async ({ queryKey }) => {
  const [_key, { sort, category, page, limit, locale }] = queryKey;
  const response = await axios.get('/api/trees', {
    params: { sort, category, page, limit, lang: locale },
  });
  return response.data;
};

export default function useTrees({ sort, category, page, limit }) {
  const { language } = useLanguage();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['trees', { sort, category, page, limit, locale: language }],
    queryFn: fetchTrees,
    placeholderData: keepPreviousData,
  });

  return {
    trees: data?.trees || [],
    total: data?.total || 0,
    isLoading,
    isError,
  };
}
