import { useState, useEffect } from 'react';
import axios from '@/utils/axios';

export default function useTrees({ sort, category, page, limit }) {
  const [trees, setTrees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchTrees() {
      try {
        const response = await axios.get('/api/trees', {
          params: { sort, category, page, limit },
        });
        setTrees(response.data.trees);
        setTotal(response.data.total);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }

    fetchTrees();
  }, [sort, category, page, limit]);

  return { trees, isLoading, error, total };
}
