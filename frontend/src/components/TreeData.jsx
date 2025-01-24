import axios from '@/utils/axios';

export const TreeData = async (limit, skip) => {
  try {
    const response = await axios.get(
      `/api/tree/get?limit=${limit}&skip=${skip}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error fetching Trees:', error.message);
    throw error;
  }
};

export const FeaturedTreeData = async () => {
  try {
    const featuredTree = await axios.get(`/api/tree/featured/all`);
    if (featuredTree.status === 200) {
      return featuredTree.data;
    }
  } catch (error) {
    console.error('Error fetching Trees:', error.message);
    throw error;
  }
};
