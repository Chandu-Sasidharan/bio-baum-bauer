import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';

const fetchFeaturedTrees = async () => {
  const response = await axios.get('/api/trees/featured');
  return response.data.featuredTrees;
};

export default function useFeaturedTrees() {
  const {
    data: featuredTrees,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['featuredTrees'],
    queryFn: fetchFeaturedTrees,
  });

  return { featuredTrees, isLoading, isError };
}
