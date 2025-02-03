import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';

const fetchTreeById = async ({ queryKey }) => {
  const [, id] = queryKey;
  const response = await axios.get(`/api/trees/${id}`);
  return response.data.tree;
};

export default function useOneTree(id) {
  const {
    data: tree,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tree', id],
    queryFn: fetchTreeById,
    enabled: !!id, // Only run the query if id is not null or undefined
  });

  return { tree, isLoading, isError };
}
