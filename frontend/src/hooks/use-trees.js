import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';

const fetchTrees = async ({ queryKey }) => {
  const [_key, { sort, category, page, limit }] = queryKey;
  const response = await axios.get('/api/trees', {
    params: { sort, category, page, limit },
  });
  return response.data;
};

export default function useTrees({ sort, category, page, limit }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['trees', { sort, category, page, limit }],
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
