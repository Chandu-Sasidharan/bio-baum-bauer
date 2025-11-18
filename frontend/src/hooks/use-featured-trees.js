import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useLanguage } from '@/context/language-context';

const fetchFeaturedTrees = async () => {
  const response = await axios.get('/api/trees/featured');
  return response.data.featuredTrees;
};

export default function useFeaturedTrees() {
  const { language } = useLanguage();
  const {
    data: featuredTrees,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['featuredTrees', language],
    queryFn: fetchFeaturedTrees,
  });

  return { featuredTrees, isLoading, isError };
}
