import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useLanguage } from '@/context/lang-context';

const fetchFeaturedTrees = async ({ queryKey }) => {
  const [, locale] = queryKey;
  const response = await axios.get('/api/trees/featured', {
    params: { lang: locale },
  });
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
