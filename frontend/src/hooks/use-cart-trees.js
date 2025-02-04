import { useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';

const fetchCartTrees = async ({ queryKey }) => {
  const [, cartItems] = queryKey;
  const response = await axios.post('/api/trees/cart', {
    ids: cartItems.map(item => item.id),
  });

  return response.data.trees;
};

export default function useCartTrees(cartItems) {
  const {
    data: cartTrees,
    isError,
    isLoading: isCartLoading,
  } = useQuery({
    queryKey: ['cartTrees', cartItems],
    queryFn: fetchCartTrees,
    enabled: cartItems.length > 0, // Only run the query if there are items in the cart
  });

  return { cartTrees, isError, isCartLoading };
}
