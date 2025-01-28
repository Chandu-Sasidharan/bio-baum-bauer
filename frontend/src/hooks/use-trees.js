import { useState, useEffect } from 'react';
import axios from '@/utils/axios';

export default function useTrees() {
  const [trees, setTrees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrees() {
      try {
        const response = await axios.get('/api/trees');
        setTrees(response.data.trees);
      } catch (error) {}
      setIsLoading(false);
      setError(error);
    }

    fetchTrees();
  }, []);

  return { trees, isLoading, error };
}
