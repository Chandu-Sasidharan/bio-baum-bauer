import axios from 'axios';
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from '@/constants';

const getPreferredLanguage = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  return (
    window.localStorage.getItem(LANGUAGE_STORAGE_KEY) ||
    document.documentElement.lang ||
    DEFAULT_LANGUAGE
  );
};

const axiosApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

axiosApiInstance.interceptors.request.use(config => {
  const lang = getPreferredLanguage();
  const headers = {
    ...(config.headers || {}),
    'Accept-Language': lang,
  };

  return {
    ...config,
    headers,
    params: { ...(config.params || {}) },
  };
});

export default axiosApiInstance;
