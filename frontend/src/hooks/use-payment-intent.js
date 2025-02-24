import { useMutation } from '@tanstack/react-query';
import axios from '@/utils/axios';

const createPaymentIntent = async paymentData => {
  const response = await axios.post('/api/payment-intent', paymentData);
  return response.data;
};

export default function usePaymentIntent() {
  const {
    data,
    mutate: getPaymentIntent,
    isError: isPaymentError,
    isPending: isPaymentLoading,
  } = useMutation({
    mutationFn: createPaymentIntent,
  });

  return { data, getPaymentIntent, isPaymentError, isPaymentLoading };
}
