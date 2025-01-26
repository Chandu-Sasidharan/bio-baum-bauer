import { useState, useEffect } from 'react';
import axios from '@/utils/axios';

export default function useFeaturedTrees() {
  const [featuredTrees, setFeaturedTrees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedTrees() {
      try {
        const response = await axios.get('/api/tree/featured');
        setFeaturedTrees(response.data.featuredTrees);
      } catch (error) {
        // do nothing
      }

      setLoading(false);
    }

    fetchFeaturedTrees();
  }, []);

  return { featuredTrees, loading };
}
