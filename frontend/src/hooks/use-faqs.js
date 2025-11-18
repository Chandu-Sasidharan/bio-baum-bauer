import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useLanguage } from '@/context/lang-context';

const fetchFaqs = async () => {
  const response = await axios.get('/api/faqs');
  return response.data.faqs;
};

export default function useFaqs() {
  const { language } = useLanguage();
  const {
    data: faqs,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['faqs', language], queryFn: fetchFaqs });

  return { faqs, isLoading, isError };
}
