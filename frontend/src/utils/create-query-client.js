import { QueryClient } from '@tanstack/react-query';

function createQueryClient() {
  return new QueryClient({
    retry: 3,
    cacheTime: 300000,
    staleTime: 5000,
    refetchOnWindowFoccus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}

export default createQueryClient;
