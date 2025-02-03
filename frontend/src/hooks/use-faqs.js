import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';

const fetchFaqs = async () => {
  const response = await axios.get('/api/faqs');
  return response.data.faqs;
};

export default function useFaqs() {
  const {
    data: faqs,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['faqs'], queryFn: fetchFaqs });

  return { faqs, isLoading, isError };
}
