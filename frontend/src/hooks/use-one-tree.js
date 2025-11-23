import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useLanguage } from '@/context/lang-context';

const fetchTreeById = async ({ queryKey }) => {
  const [, id, locale] = queryKey;
  const response = await axios.get(`/api/trees/${id}`, {
    params: { lang: locale },
  });
  return response.data.tree;
};

export default function useOneTree(id) {
  const { language } = useLanguage();
  const {
    data: tree,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tree', id, language],
    queryFn: fetchTreeById,
    enabled: !!id, // Only run the query if id is not null or undefined
  });

  return { tree, isLoading, isError };
}
