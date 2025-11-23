import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useLanguage } from '@/context/lang-context';

const fetchFaqs = async ({ queryKey }) => {
  const [, locale] = queryKey;
  const response = await axios.get('/api/faqs', { params: { lang: locale } });
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
